import proxy from 'express-http-proxy';

const proxyWithHeader = (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            if(srcReq.user) {
                proxyReqOpts.headers['X-user-id'] = srcReq.user._id;
            }
            return proxyReqOpts;
        }
    })
};

export default proxyWithHeader;