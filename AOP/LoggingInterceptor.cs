using AOP.Helpers;
using Ninject.Extensions.Interception;

namespace AOP
{
    /// <summary>
    /// Logging interceptor
    /// </summary>
    public class LoggingInterceptor : SimpleInterceptor
    {
        private readonly ITestLogger _logger;
        public LoggingInterceptor(ITestLogger logger)
        {

            _logger = logger;
        }
        protected override void AfterInvoke(IInvocation invocation)
        {
            _logger.Log(invocation.ReturnValue.ToString());
        }
    }
}
