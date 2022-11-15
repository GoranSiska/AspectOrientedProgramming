using AOP.Helpers;
using AOPML;
using Ninject;
using Ninject.Extensions.Interception.Infrastructure.Language;
using NUnit.Framework;

namespace AOP
{
    public class GivenBusinessClass
    {
        [TearDown]
        public void TearDown()
        {
            var testLogger = TestLoggerProvider.GetLogger();
            testLogger.MyLog.Clear();
        }

        [Test]
        public void WithLogging_OperationIsLogged()
        {
            //arrange
            var testLogger = TestLoggerProvider.GetLogger();

            //act
            var bc = new BusinessClassWithLogging();
            bc.Echo("Hello");

            //assert
            Assert.AreEqual("echo Hello", testLogger.MyLog.SingleOrDefault());
        }

        [Test]
        public void WithLoggingDecorator_OperationIsLogged()
        {
            //arrange
            var testLogger = TestLoggerProvider.GetLogger();

            //act
            var bc = new BusinessClassLoggingDecorator();
            bc.Echo("Hello");

            //assert
            Assert.AreEqual("echo Hello", testLogger.MyLog.SingleOrDefault());
        }

        [Test]
        public void WithLoggingInjection_OperationIsLogged()
        {
            //arrange
            var testLogger = TestLoggerProvider.GetLogger();
            var kernel = new StandardKernel();
            kernel.Bind<ITestLogger>().ToConstant(testLogger);

            //act
            var bc = kernel.Get<BusinessClassWithLoggingInjection>();
            //var bc = new BusinessClassWithLoggingInjection();
            bc.Echo("Hello");

            //assert
            Assert.AreEqual("echo Hello", testLogger.MyLog.SingleOrDefault());
        }

        [Test]
        public void WithLoggingInterception_OperationIsLogged()
        {
            //arrange
            var testLogger = TestLoggerProvider.GetLogger();
            var kernel = new StandardKernel();
            kernel.Bind<ITestLogger>().ToConstant(testLogger);
            kernel.Bind<BusinessClass>()
                .ToSelf()
                .Intercept()
                .With<LoggingInterceptor>();

            //act
            var bc = kernel.Get<BusinessClass>();
            //var bc = new BusinessClass();
            bc.Echo("Hello");

            //assert
            Assert.AreEqual("echo Hello", testLogger.MyLog.SingleOrDefault());
        }

        [Test]
        public void WithLoggingAspect_OperationIsLogged()
        {
            //arrange
            var testLogger = TestLoggerProvider.GetLogger();

            //act
            var bc = new BusinessClassWithLoggingAspect();
            bc.Echo("Hello");

            //assert
            Assert.AreEqual("echo Hello", testLogger.MyLog.SingleOrDefault());
        }

        [Test]
        public void WithLoggingGeneration_OperationIsLogged()
        {
            //arrange
            var testLogger = TestLoggerProvider.GetLogger();

            //act
            var bc = new BusinessClassWithLoggingGeneration();
            bc.EchoWithLogging("Hello");

            //assert
            Assert.AreEqual("echo Hello", testLogger.MyLog.SingleOrDefault());
        }

        [Test]
        public void WithMLLoggingAspect_OperationIsLogged()
        {
            //arrange
            var testLogger = TestLoggerProvider.GetLogger();

            //act
            var bc = new BusinessClassWithMLLoggingAspect();
            bc.Echo("Hello");

            //assert
            Assert.AreEqual("echo Hello", testLogger.MyLog.SingleOrDefault());
        }

        [Test]
        public void WithMLFabricLoggingAspect_OperationIsLogged()
        {
            //arrange
            var testLogger = TestLoggerProvider.GetLogger();

            //act
            var bc = new AOPML.BusinessClass();
            bc.Echo("Hello");

            //assert
            Assert.AreEqual("echo Hello", testLogger.MyLog.SingleOrDefault());
        }
    }
}
