using System.Collections.Generic;

namespace AOP.Helpers
{
    /// <summary>
    /// Interface for test logger class exposing log values as list
    /// </summary>
    public interface ITestLogger
    {
        void Log(string message);
        IList<string> MyLog { get; }
    }
}
