export type Shift = {
  [xOffset: number]: {
    [yOffset: number]: {
      x: number,
      y: number,
    };
  };
};
type BaseSegment = {
  src: string;
};
export type CopySegment = BaseSegment & {
  transform: 'copy';
  start: number;
  end: number;
};
export type PreparedCopySegment = CopySegment & {}
export type GlideSegment = BaseSegment & {
  transform: 'glide';
  time: number;
  length: number;
};
export type PreparedGlideSegment = GlideSegment & {
  shift: Shift;
};
export type MovementSegment = BaseSegment & {
  transform: 'movement';
  start: number;
  end: number;
};
export type PreparedMovementSegment = MovementSegment & {
  shifts: Shift[];
};
export type Segment = CopySegment | GlideSegment | MovementSegment;
export type PreparedSegment = PreparedCopySegment | PreparedGlideSegment | PreparedMovementSegment;
