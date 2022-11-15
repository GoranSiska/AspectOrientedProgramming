namespace AOP
{
    /// <summary>
    /// Business class implementing Echo operation
    /// </summary>
    /// <remarks>
    /// Attribute based runtime logging aspect applied
    /// </remarks>
    public class BusinessClassWithLoggingAspect
    {
        [LoggingAspect]
        public string Echo(string input)
        {
            var echo = "echo " + input;
            return echo;
        }
    }
}
