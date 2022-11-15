namespace AOP
{
    /// <summary>
    /// Business class implementing Echo operation
    /// </summary>
    public class BusinessClass
    {
        public virtual string Echo(string input)
        {
            var echo = "echo " + input;
            return echo;
        }
    }
}
