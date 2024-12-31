import { NextApiRequest, NextApiResponse } from 'next';
import mergeImages from 'merge-images';
import { Canvas, Image } from 'node-canvas';
import path from 'path';
import fs from 'fs';
import { MersenneTwister19937, bool, real } from 'random-js';

const layersPath = path.join(process.cwd(), 'layers');

async function generateSingleNFT() {
  const content = require(path.join(layersPath, 'content'));
  const selection = randomlySelectLayers(layersPath, content.layers);
  const imageBase64 = await mergeImages(selection.images, { Canvas, Image });

  const metadata = generateMetadata(content, 0, selection.selectedTraits);

  return { image: imageBase64, metadata };
}

function generateMetadata(content: any, tokenId: number, traits: Record<string, string>) {
  const attributes = Object.entries(traits).map(([trait_type, value]) => ({
    trait_type,
    value,
  }));
  return content.metadataTemplate(tokenId, attributes);
}

function randomlySelectLayers(layersPath: string, layers: any[]) {
  const mt = MersenneTwister19937.autoSeed();

  const images: string[] = [];
  const selectedTraits: Record<string, string> = {};

  for (const layer of layers) {
    if (bool(layer.probability)(mt)) {
      const selected = pickWeighted(mt, layer.options);
      selectedTraits[layer.name] = selected.name;
      images.push(path.join(layersPath, selected.file));
    }
  }

  return {
    images,
    selectedTraits,
  };
}

function pickWeighted(mt: MersenneTwister19937, options: { name: string; file: string; weight?: number }[]) {
  const weightSum = options.reduce((acc, option) => acc + (option.weight ?? 1.0), 0);

  const r = real(0.0, weightSum, false)(mt);

  let summedWeight = 0.0;
  for (const option of options) {
    summedWeight += option.weight ?? 1.0;
    if (r <= summedWeight) {
      return option;
    }
  }

  throw new Error('No option selected');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { image, metadata } = await generateSingleNFT();
        res.status(200).json({ image, metadata });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
}
