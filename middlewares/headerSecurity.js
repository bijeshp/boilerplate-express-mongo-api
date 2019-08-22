// To setup  various HTTP headers1 for the application

import helmet from 'helmet';

const whiteList = ['http://example1.com', 'http://example2.com', 'http://localhost:5000'];

const helmetSecurityOptions = {};
const headerSecurityMiddleware = helmet(helmetSecurityOptions);

export default headerSecurityMiddleware;
