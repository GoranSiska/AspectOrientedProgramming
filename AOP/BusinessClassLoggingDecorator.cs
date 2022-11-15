using AOP.Helpers;

namespace AOP
{
    /// <summary>
    /// Business class implementing Echo operation
    /// </summary>
    /// <remarks>
    /// Using decorator patter to make Echo operation logging aware
    /// </remarks>
    public class BusinessClassLoggingDecorator : BusinessClass
    {
        private ITestLogger _logger;
        public BusinessClassLoggingDecorator()
        {
            _logger = TestLoggerProvider.GetLogger();
        }
        public override string Echo(string input)
        {
            var echo = base.Echo(input);
            _logger.Log(echo);
            return echo;
        }
    }
}
