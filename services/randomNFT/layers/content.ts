export const layers = [
    {
        name: "Background",
        probability: 1.0,
        options: [
            { name: "MGreen", file: "background/mgreen.png", weight: 0.5 }, 
            { name: "Opink", file: "background/opink.png", weight: 0.3 }, 
            { name: "PP", file: "background/pp.png", weight: 0.1 }, 
            { name: "Sky", file: "background/sky.png", weight: 0.1 }  ,
            
        ]
    },
    {
        name: "Face",
        probability: 1.0,
        options: [
            { name: "GW", file: "face/gw.png", weight: 0.5 },
            { name: "VK", file: "face/vk.png", weight: 0.5 },
        ]
    },
    {
        name: "Hair",
        probability: 1,
        options: [
            { name: "Azure", file: "hair/azure.png", weight: 0.4 }, 
            { name: "Brown", file: "hair/brown.png", weight: 0.3 }, 
            { name: "Pink", file: "hair/pink.png", weight: 0.3 } 
        ]
    },
    {
        name: "Shirt",
        probability: 1.0,
        options: [
            { name: "Blue T-shirt", file: "shirt/blue.png", weight: 0.3 },
            { name: "Green T-shirt", file: "shirt/green.png", weight: 0.4 },
            { name: "Grey T-shirt", file: "shirt/grey.png", weight: 0.3 },
        ]
    },
    {
        name: "Top",
        probability: 0.4,
        options: [
            { name: "Ballon", file: "top/ballon.png", weight: 0.3 },
            { name: "ETH Flag", file: "top/flag.png", weight: 0.2 },
            { name: "Glass", file: "top/glass.png", weight: 0.5 },
        ]
    },
];
