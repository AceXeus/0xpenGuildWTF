export const layers = [
    {
        name: "Background",
        probability: 1.0,
        options: [
            { name: "Blue", file: "background/blue.png", weight: 0.5 }, 
            { name: "Green", file: "background/green.png", weight: 0.3 }, 
            { name: "Orange", file: "background/orange.png", weight: 0.1 }, 
            { name: "Wheat", file: "background/wheat.png", weight: 0.1 }  
        ]
    },
    {
        name: "Eyes",
        probability: 1.0,
        options: [
            { name: "3D", file: "eyes/3d.png", weight: 0.4 }, 
            { name: "Laser", file: "eyes/laser.png", weight: 0.3 }, 
            { name: "Square Shades", file: "eyes/square-shades.png", weight: 0.3 } 
        ]
    },
    {
        name: "Facial Hair",
        probability: 1.0,
        options: [
            { name: "Goatee", file: "facial-hair/goatee.png", weight: 0.6 },
            { name: "Long Beard", file: "facial-hair/long-beard.png", weight: 0.3 }, 
            { name: "Mutton Chops", file: "facial-hair/mutton-chops.png", weight: 0.1 }
        ]
    },
    {
        name: "Head",
        probability: 1.0,
        options: [
            { name: "Albino", file: "head/albino.png", weight: 0.1 },
            { name: "Light", file: "head/light.png", weight: 0.2 },
            { name: "Mid", file: "head/mid.png", weight: 0.3 },
            { name: "Skeleton", file: "head/skeleton.png", weight: 0.3 },
            { name: "Zoombie", file: "head/zombie.png", weight: 0.1 }
        ]
    },
    {
        name: "Shirt",
        probability: 1.0,
        options: [
            { name: "Flames", file: "shirt/flames.png", weight: 0.4 },
            { name: "Pinata", file: "shirt/pinata.png", weight: 0.2 },
            { name: "Purple Blue Pink", file: "shirt/purple-blue-pink.png", weight: 0.3 },
            { name: "Stripes Blue White", file: "shirt/stripes-blue-white.png", weight: 0.1 }
        ]
    },
    {
        name: "Top",
        probability: 1.0,
        options: [
            { name: "Cap", file: "top/cap.png", weight: 0.25 },
            { name: "Cowboy", file: "top/cowboy.png", weight: 0.25 },
            { name: "Einstein", file: "top/einstein.png", weight: 0.2 },
            { name: "Fez", file: "top/fez.png", weight: 0.2 },
            { name: "Like A Sir", file: "top/like-a-sir.png", weight: 0.1 }
        ]
    }
];
