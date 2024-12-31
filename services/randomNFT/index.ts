import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import path from 'path';
import { MersenneTwister19937, bool, real } from 'random-js';
import { layers } from './layers/content';

const layersPath = path.join(process.cwd(), 'services', 'randomNFT', 'layers');

export async function generateSingleNFT() {
  const selection = randomlySelectLayers(layersPath, layers);
  const imageBase64 = await mergeImages(selection.images, { Canvas, Image });

  const metadata = generateMetadata(selection.selectedTraits);

  return { image: imageBase64, metadata };
}

function generateMetadata(
  traits: Record<string, string>
) {
  const attributes = Object.entries(traits).map(([trait_type, value]) => ({
    trait_type,
    value,
  }));
  return {
    attributes,
  };
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

function pickWeighted(
  mt: MersenneTwister19937,
  options: { name: string; file: string; weight?: number }[]
) {
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
