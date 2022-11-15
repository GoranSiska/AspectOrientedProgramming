using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Text;
using System.Text;

namespace AOP
{
    [Generator]
    public class LoggingGenerator : ISourceGenerator
    {
        public void Initialize(GeneratorInitializationContext context)
        {
            context.RegisterForSyntaxNotifications(() => new LoggingSyntaxReceiver());
        }

        public void Execute(GeneratorExecutionContext context)
        {
            LoggingSyntaxReceiver syntaxReceiver = context.SyntaxReceiver as LoggingSyntaxReceiver;
            if(syntaxReceiver == null)
            {
                return;
            }
            ClassDeclarationSyntax businessClass = syntaxReceiver.ClassToAugment;
            if (businessClass is null)
            {
                return;
            }

            // add the generated implementation to the compilation
            SourceText sourceText = SourceText.From($@"
using AOP.Helpers;

namespace AOP
{{
    public partial class {businessClass.Identifier}
    {{
        private ITestLogger testLogger = TestLoggerProvider.GetLogger();

        public string EchoWithLogging(string input)
        {{
            var echo = Echo(input);
            testLogger.Log(echo);
            return echo;
        }}
    }}
}}", Encoding.UTF8);
            context.AddSource("BusinessClassWithLoggingGeneration.Generated.cs", sourceText);
        }

        class LoggingSyntaxReceiver : ISyntaxReceiver
        {
            public ClassDeclarationSyntax ClassToAugment { get; private set; }

            public void OnVisitSyntaxNode(SyntaxNode syntaxNode)
            {
                if (syntaxNode is ClassDeclarationSyntax cds &&
                    cds.Identifier.ValueText == "BusinessClassWithLoggingGeneration")
                {
                    ClassToAugment = cds;
                }
            }
        }
    }
}
