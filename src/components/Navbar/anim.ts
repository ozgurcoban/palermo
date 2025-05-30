export const opacity = {
  initial: {
    opacity: 0,
  },

  open: {
    opacity: 1,
    transition: { duration: 0.2 },
  },

  closed: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const transition = { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] };

export const height = {
  initial: {
    height: 0,
  },

  enter: {
    height: "auto",
    transition,
  },

  exit: {
    height: 0,
    transition,
  },
};

export const blur = {
  initial: {
    filter: "blur(0px)",
    opacity: 1,
  },
  open: {
    filter: "blur(4px)",
    opacity: 0.6,
    transition: { duration: 0.2 },
  },
  closed: {
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export const translate = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  enter: (i: number[]) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96], delay: i[0] * 0.05 },
  }),
  exit: (i: number[]) => ({
    y: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96], delay: i[1] * 0.05 },
  }),
};

export const background = {
  initial: {
    height: 0,
  },

  open: {
    height: "100vh",
    transition,
  },

  closed: {
    height: 0,
    transition,
  },
};
