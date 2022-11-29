import React from 'react';

const Blogs = () => {
    return (
        <div className='grid  justify-items-center my-8 gap-10'>
            <div className="card lg:w-2/3 w-4/5 bg-base-100 shadow-xl">
                <figure><img src="https://i.ibb.co/5jdDH6v/react.webp" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">What are the different ways to manage a state in a React application?</h2>
                    <p>When we talk about state in our applications, it’s important to be clear about what types of state actually matter.

                        There are four main types of state you need to properly manage in your React apps:

                        <li>Local state</li>
                        <li> Global state</li>
                        <li>Server state</li>
                        <li>URL state</li>
                        <br />
                        Let's cover each of these in detail:

                        <p>Local (UI) state – Local state is data we manage in one or another component.

                            Local state is most often managed in React using the useState hook.</p>
                        <br />
                        <p>
                            For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.

                            Global (UI) state – Global state is data we manage across multiple components.
                        </p>
                        <br />

                        <p>Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.

                            A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.

                            Sometimes state we think should be local might become global.</p>

                        <p>
                            Server state – Data that comes from an external server that must be integrated with our UI state.

                            Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.
                        </p>
                        <br />
                        <p>
                            There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.

                            Fortunately there are tools such as SWR and React Query that make managing server state much easier.

                            URL state – Data that exists on our URLs, including the pathname and query parameters.
                        </p>
                        <br />
                        URL state is often missing as a category of state, but it is an important one.
                        In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!

                        There are undoubtedly more pieces of state that we could identify, but these are the major categories worth focusing on for most applications you build.</p>

                </div>
            </div>
            <div className="card lg:w-2/3 w-4/5 bg-base-100 shadow-xl">
                <figure><img src="https://i.ibb.co/4KLpFNz/Diagram108.png" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">How does prototypical inheritance work?</h2>
                    <p>
                        Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.
                    </p>
                    <br />
                    <strong>Syntax:</strong>
                    <p>ChildObject.__proto__ = ParentObject</p>
                    <br />
                    <p>
                        Example In the given example, there are two objects ‘person’ and ‘GFGuser’. The object ‘GFGuser’ inherits the methods and properties of the object ‘person’ and further uses them.
                    </p>

                </div>
            </div>
            <div className="card lg:w-2/3 w-4/5 bg-base-100 shadow-xl">
                <figure><img src="https://i.ibb.co/1frVvjV/unit-testing-life-cycle.png" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">What is a unit test? Why should we write unit tests?</h2>
                    <p>
                        Unit Testing is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers. Unit Tests isolate a section of code and verify its correctness. A unit may be an individual function, method, procedure, module, or object.
                        <br />

                    </p>
                    <p>
                        In SDLC, STLC, V Model, Unit testing is first level of testing done before integration testing. Unit testing is a WhiteBox testing technique that is usually performed by the developer. Though, in a practical world due to time crunch or reluctance of developers to tests, QA engineers also do unit testing.
                    </p>
                    <br />
                    <p>
                        <figure>    <img className='flex items-stretch' src="https://i.ibb.co/kSyqH4h/Unit-Testing.png" alt="" /></figure>
                        Unit Testing is important because software developers sometimes try saving time doing minimal unit testing and this is myth because inappropriate unit testing leads to high cost Defect fixing during System Testing, Integration Testing and even Beta Testing after application is built. If proper unit testing is done in early development, then it saves time and money in the end.

                        Here, are the key reasons to perform unit testing in software engineering:
                    </p>

                </div>
            </div>
            <div className="card lg:w-2/3 w-4/5 bg-base-100 shadow-xl">
                <figure><img src="https://i.ibb.co/ZYv8mxZ/Inner-01-React-vs-Angular-vs-Vue-js-Introduction-2x.png" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">React vs. Angular vs. Vue?</h2>
                    <div className='bg-slate-200 p-4 rounded-md'>
                        <h2 className='font-bold'>Angular vs React</h2>

                        <p>
                            If the choice you’re making is based on Angular vs React alone, then you’ll simply need to consider the pros and cons discussed for those libraries in this post. But overall, keep in mind that both libraries can be used for mobile and web apps, while Angular is generally better for more complex apps that are enterprise-ready.
                        </p>
                        <br />
                        <p>
                            React often requires extra modules and components, which keeps the core library small, but means there’s extra work involved when incorporating outside tools. Angular, on the other hand, is more of a full-fledged solution that doesn’t require extras like React often does, though it does have a steeper learning curve for its core compared to React.

                        </p>
                        <br />
                        <p>
                            React is more suitable for intermediate to advanced JavaScript developers who are familiar with concepts from ES6 and up, while Angular favors those same developers who are also familiar with TypeScript.
                        </p>
                    </div>

                    <div className='bg-slate-200 p-4 rounded-md'>
                        <h2 className='font-bold'>React vs Vue</h2>
                        <p>
                            The choice between React vs Vue is often debated and it’s not an easy one. Vue has a vibrant and ever-growing community and has taken over popularity vs. React in many respects. React developers are still churning out lots of new components and extras, so there’s no sign that React is on the decline either.
                        </p>
                        <br />
                        <p>
                            Vue is generally more suited to smaller, less complex apps and is easier to learn from scratch compared to React. Vue can be easier to integrate into new or existing projects and many feel its use of HTML templates along with JSX is an advantage.
                        </p>
                        <br />
                        <p>
                            Overall, Vue might be the best choice if you’re a newer developer and not as familiar with advanced JavaScript concepts, while React is quite well suited for experienced programmers and developers who have worked with object-oriented JavaScript, functional JavaScript, and similar concepts.
                        </p>
                    </div>
                    <div className='bg-slate-200 p-4 rounded-md'>
                        <h2 className='font-bold'>Angular vs Vue</h2>
                        <p>
                            In most cases, you probably wouldn’t be deciding between only Angular and Vue. They are vastly different libraries with very different feature sets and learning curves. Vue is the clear choice for less experienced developers, and Angular would be preferred for those working on larger apps.
                        </p>
                        <br />
                        <p>
                            A large library like Angular would require more diligence in keeping up with what’s new, while Vue would be less demanding in this regard and the fact that the two most recent major releases of Vue are in separate repositories helps.
                        </p>
                        <br />
                        <p>
                            It should also be noted that Vue was created by a developer who formerly worked on Angular for Google, so that’s another thing to keep in mind, though that wouldn’t have a huge impact on your decision.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Blogs;