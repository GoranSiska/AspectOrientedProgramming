using AOP.Helpers;

namespace AOP
{
    /// <summary>
    /// Business class implementing Echo operation
    /// </summary>
    /// <remarks>
    /// Using constructor injected logging
    /// </remarks>
    public class BusinessClassWithLoggingInjection
    {
        private ITestLogger _logger;
        public BusinessClassWithLoggingInjection(ITestLogger logger)
        {
            _logger = logger;
        }
        public string Echo(string input)
        {
            var echo = "echo " + input;
            _logger.Log(echo);
            return echo;
        }
    }
}
