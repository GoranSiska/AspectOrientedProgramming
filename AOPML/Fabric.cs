using Metalama.Framework.Fabrics;

namespace AOPML
{
    internal class Fabric : ProjectFabric
    {
        public override void AmendProject(IProjectAmender amender)
        {
            amender
                .With(p => p.AllTypes
                    .Where(t => t.Name == "BusinessClass")
                    .SelectMany(t => t.Methods)
                    .Where(t => t.Name == "Echo"))
                .AddAspectIfEligible<LoggingAspectAttribute>();
        }
    }
}
