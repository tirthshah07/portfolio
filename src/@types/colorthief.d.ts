declare module 'colorthief' {
    export default class ColorThief {
      constructor();
      getColor(img: HTMLImageElement, quality?: number): [number, number, number];
      getPalette(img: HTMLImageElement, paletteSize?: number, quality?: number): [number, number, number][];
      setSourceImage(img: HTMLImageElement): void;
    }
  } 