using AOP.Helpers;

namespace AOP
{
    /// <summary>
    /// Business class implementing Echo operation
    /// </summary>
    /// <remarks>
    /// Manually implemented logging
    /// </remarks>
    public class BusinessClassWithLogging
    {
        private ITestLogger _logger;
        public BusinessClassWithLogging()
        {
            _logger = TestLoggerProvider.GetLogger();
        }
        public string Echo(string input)
        {
            var echo = "echo " + input;
            _logger.Log(echo);
            return echo;
        }
    }
}
