function uncaughtExceptionHandler(err) {
  console.error(`[Exception] ${err.message}\n  stack: ${err.stack}`);
}

function unhandledRejectionHandler(err) {
  if (err instanceof Error) {
    console.error(`[UnhandledRejection] ${err.message}\n  stack: ${err.stack}`);
  } else {
    console.error(`[UnhandledRejection] ${err}`);
  }
}

export default { uncaughtExceptionHandler, unhandledRejectionHandler };