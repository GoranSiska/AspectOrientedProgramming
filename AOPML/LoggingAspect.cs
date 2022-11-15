using AOP.Helpers;
using Metalama.Framework.Aspects;

namespace AOPML
{
    public class LoggingAspectAttribute : OverrideMethodAspect
    {           
        public override dynamic? OverrideMethod()
        {
            var testLogger = TestLoggerProvider.GetLogger();
            var result = meta.Proceed();
            testLogger.Log(result);
            return result;
        }
    }
}
