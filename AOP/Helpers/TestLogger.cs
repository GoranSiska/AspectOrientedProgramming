using System.Collections.Generic;

namespace AOP.Helpers
{
    /// <summary>
    /// Test logger class exposing log values as list
    /// </summary>
    public class TestLogger : ITestLogger
    {
        public TestLogger()
        {
            MyLog = new List<string>();
        }

        public IList<string> MyLog { get; private set; }
  
        public void Log(string message)
        {
            if(message == null)
            {
                return;
            }
            MyLog.Add(message);
        }
    }
}
