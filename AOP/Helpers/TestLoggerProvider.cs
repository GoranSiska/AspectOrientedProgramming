namespace AOP.Helpers
{
    /// <summary>
    /// Class providing single instance of test logger
    /// </summary>
    public class TestLoggerProvider
    {
        private static ITestLogger logger;

        static TestLoggerProvider()
        {
            logger = new TestLogger();
        }

        public static ITestLogger GetLogger()
        {
            return logger;
        }
    }
}
