using AOP.Helpers;
using PostSharp.Aspects;
using PostSharp.Serialization;
using System.Reflection;

namespace AOP
{
    /// <summary>
    /// Logging aspect
    /// </summary>
    [PSerializable]
    public class LoggingAspect : OnMethodBoundaryAspect
    {
        public ITestLogger Logger { get; set; }
        public override void RuntimeInitialize(MethodBase method)
        {
            base.RuntimeInitialize(method);
            Logger = TestLoggerProvider.GetLogger();
        }
        public override void OnSuccess(MethodExecutionArgs args)
        {
            base.OnSuccess(args);
            Logger.Log(message: args.ReturnValue.ToString());
        }
    }
}
