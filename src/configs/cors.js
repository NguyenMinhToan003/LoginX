import { arrayHost } from "~/utils/host";

const allowedOrigins = arrayHost

// Hàm kiểm tra CORS
export const corsOptionsDelegate = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};
