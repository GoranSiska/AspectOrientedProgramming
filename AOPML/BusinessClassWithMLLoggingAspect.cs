namespace AOPML
{
    public class BusinessClassWithMLLoggingAspect
    {
        [LoggingAspect]
        public virtual string Echo(string input)
        {
            var echo = "echo " + input;
            return echo;
        }
    }
}