namespace AOPML
{
    public class BusinessClass
    {
        public virtual string Echo(string input)
        {
            var echo = "echo " + input;
            return echo;
        }
    }
}