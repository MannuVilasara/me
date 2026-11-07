declare module 'pacman-contribution-graph' {
  export interface ArcadeRendererOptions {
    game?: string;
    username?: string;
    platform?: string;
    gameTheme?: string;
    playerStyle?: string;
    svgCallback?: (svg: string) => void;
  }

  export class ArcadeRenderer {
    constructor(options: ArcadeRendererOptions);
    start(): void;
  }
}
