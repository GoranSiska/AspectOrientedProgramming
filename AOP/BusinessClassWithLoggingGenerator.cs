namespace AOP
{
    /// <summary>
    /// Business class implementing Echo operation
    /// </summary>
    /// <remarks>
    /// Using code generation to make custom logging aware operation 
    /// </remarks>
    public partial class BusinessClassWithLoggingGeneration
    {
        public string Echo(string input)
        {
            var echo = "echo " + input;
            return echo;
        }
    }
}
