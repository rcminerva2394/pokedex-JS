export const weightConverter = (hectograms) => (hectograms * 100) / 1000;

export const heightConverter = (decimeter) => decimeter / 10;

export { weightConverter as convertWeight, heightConverter as convertHeight };
