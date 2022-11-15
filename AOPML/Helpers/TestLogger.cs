using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace AOP.Helpers
{
    [Serializable]
    public class TestLogger : ISerializable    {
        public TestLogger()
        {
            //MyLog = new List<string>();
        }

        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            
        }

        //public List<string> MyLog { get; private set; }

        public void Log(string message)
        {
            if(message == null)
            {
                return;
            }
          //  MyLog.Add(message);
        }
    }
}
