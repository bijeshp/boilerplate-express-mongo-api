// To Configure Cross-origin resource sharing for the application
import cors from 'cors';
const whiteList = ['http://example1.com', 'http://example2.com', 'http://localhost:5000'];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) {
      return callback(null, true); // Needs to be removed for production;
    }
    if (whiteList.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
};

const corsMiddleWare = cors(corsOptions);

export default corsMiddleWare;
