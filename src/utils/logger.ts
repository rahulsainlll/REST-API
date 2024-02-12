import pino from "pino";
import dayjs from "dayjs";
import pinoPretty from "pino-pretty";
import pinoMultiStream from "pino-multi-stream";

// Create a pino logger instance
const prettyStream = pinoMultiStream.prettyStream();
const logStream = pino.destination(prettyStream);

const log = pino(
  {
    base: {
      pid: true,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
  pinoPretty({ destination: logStream })
);

export default log;
