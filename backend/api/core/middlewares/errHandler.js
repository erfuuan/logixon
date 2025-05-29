import chalk from 'chalk';
import responseBuilder from '../utils/responseBuilder.js';

export default async (err, req, res, next) => {
    console.log(chalk.red.underline('ERR handler middleware is called =>'));
    console.log(chalk.red.underline('err message : '), err);
    console.log({ workspace: req?.workspace?.name || req.workspaceName, userId: req?.userData?.id });
    console.log({ reqQuery: req?.query, reqParams: req?.params });
    console.log({ reqBody: JSON.stringify(req?.body) });

    return responseBuilder.internalErr(res);
};
