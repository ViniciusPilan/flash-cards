## COMPUTER OPERATIONAL SYSTEMS

### 1. What is the primary role of an operating system in a computer?

An operating system provides the abstractions and mechanisms that allow applications to use hardware without managing hardware directly. It manages CPU, memory, storage, devices, processes, and security while exposing consistent interfaces to software.

For a DevOps Engineer, the OS is the foundation where applications, containers, agents, and automation execute. Understanding its resource and process model helps explain failures such as memory exhaustion, permission errors, disk saturation, and unexpected process termination.

### 2. What is a process, and how is it different from a program?

A program is a static set of instructions stored on disk, while a process is an executing instance of a program with its own address space, resources, and execution state. Multiple processes can execute the same program independently.

In DevOps, this distinction matters when troubleshooting services, containers, and system daemons. Process states, parent-child relationships, signals, exit codes, and resource consumption are fundamental concepts when diagnosing production workloads.

### 3. What is virtual memory and why is it important?

Virtual memory gives each process the abstraction of having its own memory address space, independent of the physical RAM layout. The operating system and hardware translate virtual addresses into physical memory and can use disk-backed mechanisms when necessary.

For DevOps Engineers, virtual memory explains behaviors such as swapping, page faults, memory pressure, and out-of-memory conditions. Understanding it is especially useful when configuring workloads with memory limits and investigating performance degradation.

### 4. What is the difference between user space and kernel space?

User space is where normal applications execute with restricted privileges, while kernel space is where the operating system executes privileged operations and manages hardware and core resources. Applications interact with the kernel through controlled interfaces such as system calls.

This separation provides isolation and security. In infrastructure environments, concepts such as system calls, kernel modules, namespaces, cgroups, and privileged containers all depend on understanding the boundary between applications and the kernel.

### 5. What is a system call?

A system call is a controlled interface through which a user-space application requests a service from the operating system kernel. Operations such as opening files, creating processes, allocating memory, and communicating through sockets commonly involve system calls.

For DevOps, system calls are particularly relevant to containers and security. Tools such as `strace`, seccomp, and container runtimes interact with or restrict system-call behavior, making this concept important for troubleshooting and hardening workloads.

### 6. How does an operating system manage CPU scheduling?

The operating system scheduler decides which runnable processes or threads receive CPU time. It attempts to balance responsiveness, fairness, priorities, and overall system utilization according to its scheduling model.

In DevOps environments, CPU requests, limits, process priorities, and workload contention ultimately depend on this mechanism. Understanding scheduling helps explain why a workload can experience CPU throttling or latency even when the machine still appears to have available resources.

### 7. What is a file descriptor?

A file descriptor is a numeric handle used by a process to reference an open resource managed by the operating system. Despite its name, it can represent files, sockets, pipes, devices, and other I/O resources.

File-descriptor exhaustion can cause applications to fail even when CPU and memory look healthy. For DevOps Engineers, monitoring limits such as `ulimit`, open connections, and application descriptor usage is therefore an important part of diagnosing production incidents.

### 8. What is a filesystem?

A filesystem defines how data is organized, stored, accessed, and managed on a storage device or logical storage abstraction. It provides concepts such as files, directories, permissions, metadata, and allocation.

For DevOps, filesystem behavior directly affects applications and infrastructure. Disk capacity, inode exhaustion, filesystem permissions, mount points, durability, and I/O performance can all become operational problems independent of application logic.

### 9. What is a daemon?

A daemon is a background process designed to provide a service without requiring direct user interaction. Operating systems commonly run daemons for networking, logging, scheduling, authentication, and other system functions.

DevOps Engineers frequently manage daemons through service managers such as systemd. Understanding startup behavior, dependencies, logs, restart policies, environment configuration, and process ownership is essential when operating Linux-based infrastructure.

### 10. What is the purpose of permissions and ownership in an operating system?

Operating systems use ownership and permission mechanisms to control which users and groups can read, modify, execute, or otherwise access resources. This provides a basic security boundary between processes and users.

In DevOps, permissions are critical for services, deployment agents, SSH access, secrets, mounted volumes, and automation. Applying least privilege reduces the impact of compromised processes and prevents accidental access to sensitive system resources.

---

## SOFTWARE ENGINEER

### 1. What is abstraction in software engineering?

Abstraction means exposing the essential behavior of a component while hiding unnecessary implementation details. It allows engineers to reason about complex systems through simpler interfaces and contracts.

For a DevOps Engineer, abstraction appears everywhere: APIs, Terraform modules, container images, Kubernetes resources, and cloud services. Good abstractions reduce coupling and allow infrastructure or application components to change internally without forcing every consumer to change.

### 2. What is the difference between coupling and cohesion?

Coupling describes how strongly components depend on each other, while cohesion describes how closely related the responsibilities inside a component are. Good software generally aims for low coupling and high cohesion.

This principle also applies to infrastructure. A Terraform module with one clear responsibility is easier to reuse, test, and maintain than a module controlling unrelated systems. Reducing unnecessary dependencies also makes operational changes safer.

### 3. What is an API?

An API is a defined interface through which software components communicate. It specifies how consumers request operations or data and what responses or errors they can expect.

DevOps Engineers interact with APIs constantly through cloud providers, Kubernetes, CI/CD systems, monitoring platforms, and internal services. Understanding contracts, authentication, idempotency, versioning, and error handling is therefore fundamental to automation.

### 4. What is idempotency?

An operation is idempotent when performing it multiple times produces the same desired result as performing it once. Idempotency is particularly valuable in automation because retries are common when networks or distributed systems fail.

Infrastructure tools rely heavily on this principle. A deployment or provisioning process should be safe to execute repeatedly without continuously creating duplicate resources or producing unintended state changes.

### 5. What is technical debt?

Technical debt represents future cost created by choosing solutions that are faster or easier today but make future changes, maintenance, or reliability more difficult. It can exist in application code, infrastructure, architecture, documentation, and processes.

Technical debt is not automatically bad; sometimes it is a deliberate trade-off. The important practice is making it visible, understanding its impact, and paying it down when its operational or development cost becomes significant.

### 6. Why are interfaces important in software engineering?

Interfaces define the contract between components without requiring consumers to understand their internal implementation. They allow implementations to evolve while preserving expected behavior.

For DevOps Engineers, interfaces appear in APIs, command-line tools, cloud providers, Kubernetes controllers, Terraform providers, and service boundaries. Stable interfaces make automation more reusable and reduce the number of assumptions infrastructure code makes about implementation details.

### 7. What is separation of concerns?

Separation of concerns means organizing a system so that different responsibilities are handled independently rather than being mixed together. This reduces complexity and makes individual parts easier to understand and modify.

In DevOps, the same principle can be applied to infrastructure repositories, deployment pipelines, application configuration, observability, and security controls. Clear boundaries make ownership easier and reduce the risk that one change unintentionally affects unrelated functionality.

### 8. What is versioning and why does it matter?

Versioning provides a way to identify and manage different revisions of software, APIs, configurations, and infrastructure definitions. It allows teams to understand what changed and reproduce or roll back known states.

Version control is fundamental to DevOps because infrastructure and application changes should be traceable. Git provides the foundation for reviewing changes, collaborating, auditing decisions, and recovering previous versions.

### 9. What is dependency management?

Dependency management is the process of controlling external components that software depends on, including libraries, runtimes, modules, providers, and tools. Dependencies influence security, compatibility, reproducibility, and maintenance.

For DevOps, unmanaged dependencies can affect container builds, CI runners, Terraform providers, and automation scripts. Lock files, version constraints, dependency scanning, and controlled upgrade processes help make environments predictable.

### 10. Why is error handling important?

Error handling defines how software detects, communicates, and responds to unexpected conditions. Good error handling distinguishes recoverable failures from unrecoverable ones and provides enough context to diagnose problems.

For DevOps Engineers, poor error handling can make automation dangerous. Scripts and pipelines should detect failures explicitly, return meaningful exit codes, avoid silently continuing after critical errors, and expose useful information to operators and monitoring systems.

---

## SYSTEM DESIGN

### 1. What is scalability in system design?

Scalability is a system's ability to handle increasing workload while maintaining acceptable performance and reliability. It can involve adding resources to a single system or distributing workload across multiple instances.

Horizontal scaling is especially important for cloud-native environments because services can run multiple replicas behind load balancers. However, scaling compute alone does not solve bottlenecks in databases, networks, storage, or external dependencies.

### 2. What is the difference between horizontal and vertical scaling?

Vertical scaling increases the resources of an existing machine, such as CPU or memory. Horizontal scaling adds more instances and distributes workload among them.

Cloud-native architectures generally favor horizontal scaling because it improves elasticity and can increase availability. However, the architecture must support distribution, which often requires stateless services, load balancing, shared or distributed storage, and coordination mechanisms.

### 3. What is a stateless application?

A stateless application does not depend on local process memory or local filesystem state to preserve information between requests. Required state is stored in external systems such as databases, caches, or object storage.

Statelessness makes workloads easier to scale, replace, and reschedule. This is one reason it is common in Kubernetes environments: a failed or rescheduled pod can be replaced without requiring the application to recover important state from the previous instance.

### 4. What is a load balancer?

A load balancer distributes incoming requests across multiple backend instances according to a defined routing strategy. It can also perform health checks and stop sending traffic to unhealthy instances.

For DevOps Engineers, load balancing is an important availability and scalability mechanism. It can exist at different network layers and may be implemented by cloud infrastructure, ingress controllers, service meshes, or dedicated network appliances.

### 5. What is a single point of failure?

A single point of failure is a component whose failure can cause the entire system or an important capability to become unavailable. Removing these points generally requires redundancy or alternative paths.

High availability therefore involves identifying critical dependencies and ensuring that their failure does not cause unacceptable downtime. Redundancy must include databases, networking, compute, storage, control planes, and external dependencies where appropriate.

### 6. What is availability?

Availability describes the proportion of time a system is operational and able to provide its intended service. It is commonly expressed as a percentage or through service-level objectives.

Designing for availability requires more than adding replicas. Health checks, failure detection, redundancy, graceful degradation, backups, recovery procedures, and dependency management all influence the actual availability experienced by users.

### 7. What is a distributed system?

A distributed system consists of multiple independent computing components that cooperate over a network to provide a unified capability. Communication therefore introduces latency, partial failures, consistency challenges, and coordination problems.

DevOps Engineers operate distributed systems constantly, including Kubernetes clusters, microservices, cloud platforms, and observability stacks. Understanding that networks can fail or become slow is fundamental to designing reliable automation and services.

### 8. What is the CAP theorem?

The CAP theorem states that during a network partition, a distributed data system must choose between strong consistency and availability. A system cannot guarantee both simultaneously under partition conditions.

CAP is useful because it forces engineers to understand architectural trade-offs rather than treating consistency and availability as independent properties. The correct choice depends on the application's business requirements and failure model.

### 9. What is a bottleneck?

A bottleneck is a resource or component that limits the overall throughput or performance of a system. It can exist in CPU, memory, storage, networking, databases, external services, or application logic.

Scaling the wrong component does not solve a bottleneck. DevOps Engineers should use metrics, traces, profiling, and workload characteristics to identify where capacity is actually constrained before changing architecture or infrastructure.

### 10. What is fault tolerance?

Fault tolerance is the ability of a system to continue providing an acceptable level of service despite failures in individual components. It is achieved through mechanisms such as redundancy, retries, failover, replication, and graceful degradation.

Fault tolerance must be designed around realistic failure scenarios. Adding retries everywhere, for example, can amplify failures. Good designs consider failure domains, dependency behavior, recovery time, and the consequences of partial failure.

---

## ARTIFICIAL INTELLIGENCE — LLM ECOSYSTEM

### 1. What is a Large Language Model?

A Large Language Model is a machine-learning model trained on large amounts of text to predict and generate sequences of tokens. Modern LLMs use transformer-based architectures to learn relationships between tokens and produce context-dependent outputs.

For DevOps Engineers, an LLM can act as an interface for reasoning over operational information, generating code, summarizing incidents, or interacting with tools. However, its output is probabilistic and should not automatically be treated as authoritative.

### 2. What is a token in an LLM?

A token is a unit of text processed by an LLM. Tokens are not necessarily complete words; a token may represent part of a word, a whole word, punctuation, or another text fragment.

Tokenization matters operationally because models have context-window and usage constraints expressed in tokens. Large prompts, logs, documentation, and tool results can consume significant context, so effective AI systems must control and structure the information sent to the model.

### 3. What is the context window?

The context window is the amount of tokenized information an LLM can process as part of a request and its generated response. It limits how much conversation, documentation, tool output, or other information can be considered simultaneously.

For DevOps AI systems, this means you cannot simply provide every log, configuration, and documentation page to an agent. Information must be selected, summarized, retrieved, or otherwise compressed so the model receives the most relevant context.

### 4. What is RAG?

Retrieval-Augmented Generation combines information retrieval with LLM generation. Instead of relying only on knowledge encoded during model training, the system retrieves relevant external information and includes it in the model's context.

A practical DevOps example is an agent retrieving Kubernetes runbooks, architecture documentation, and incident history before answering an operational question. The LLM performs reasoning and generation, while the retrieval system provides current or domain-specific knowledge.

### 5. What are embeddings?

Embeddings are numerical vector representations of data designed so that semantically similar information has similar positions in vector space. They are commonly used for semantic search and retrieval.

In a RAG system, documentation can be divided into chunks, converted into embeddings, and stored in a vector-capable database. A user query is embedded in the same space, allowing the system to retrieve relevant chunks based on semantic similarity.

### 6. What is fine-tuning?

Fine-tuning adapts a pretrained model by training it further on a specialized dataset. It can change how the model behaves or performs specific tasks rather than simply providing additional information at request time.

For many DevOps use cases, RAG is preferable when the problem is access to changing knowledge such as internal documentation. Fine-tuning is more appropriate when consistent behavior, style, or task-specific capabilities are the primary requirement.

### 7. What is an AI agent?

An AI agent is a system in which an LLM can reason about a goal, use tools, observe results, and perform multiple steps to complete a task. The LLM is therefore part of a larger system rather than the entire system.

A DevOps agent might inspect monitoring data, query Kubernetes, retrieve documentation, propose a diagnosis, and execute an approved remediation. Tool permissions, validation, observability, and human approval are essential because generated decisions can be incorrect.

### 8. What is tool calling?

Tool calling allows an LLM-based system to request structured operations from external tools or APIs. The model decides that a tool is useful, provides structured arguments, and receives the tool result as additional context.

This enables agents to interact with systems such as Kubernetes, Git, cloud APIs, monitoring platforms, and ticketing systems. The tool itself performs the actual operation; the LLM should not be treated as having direct access to infrastructure unless explicitly provided.

### 9. What is hallucination in an LLM?

Hallucination occurs when an LLM generates information that appears plausible but is unsupported, incorrect, or fabricated. It results from the probabilistic nature of language generation rather than from intentional deception.

In DevOps, hallucinations can be dangerous because incorrect commands or configuration recommendations may cause outages or security issues. Grounding responses with trusted data, validating generated actions, limiting permissions, and requiring approval for risky operations are important controls.

### 10. How should an LLM be integrated safely into DevOps automation?

An LLM should generally be treated as a probabilistic reasoning component rather than an inherently trusted automation engine. Its permissions should be limited, tool inputs validated, outputs checked, and destructive actions controlled through explicit policies or human approval.

A safer architecture separates reasoning from execution. The model can propose a Kubernetes command or remediation, while deterministic systems validate the request and enforce authorization before anything changes production infrastructure.

---

## COMPUTER NETWORK

### 1. What is the purpose of the OSI model?

The OSI model provides a conceptual framework for understanding networking by separating communication into layers with different responsibilities. It helps engineers reason about where protocols and failures belong.

DevOps Engineers do not need to implement every layer, but the model is useful during troubleshooting. For example, DNS, TCP, TLS, HTTP, and application behavior represent different concerns, allowing incidents to be investigated systematically instead of treating networking as a single problem.

### 2. What is the difference between TCP and UDP?

TCP provides connection-oriented, reliable, ordered delivery with mechanisms such as acknowledgments, retransmission, and congestion control. UDP provides a simpler datagram-based transport without guaranteeing delivery or ordering.

The choice depends on application requirements. HTTP commonly uses TCP, while DNS can use UDP or TCP. Real-time systems may prefer UDP because avoiding retransmission can be more important than guaranteeing every packet arrives.

### 3. What is an IP address?

An IP address identifies a network interface or endpoint within an IP network and allows packets to be routed toward their destination. IPv4 and IPv6 use different address formats and capabilities.

For DevOps, IP addressing is fundamental to VPCs, Kubernetes networking, load balancers, service discovery, and firewall rules. Understanding private ranges, routing, subnets, and address allocation helps diagnose connectivity problems.

### 4. What is subnetting?

Subnetting divides an IP address space into smaller logical networks. A subnet is defined by an address range and prefix length, allowing routing and network boundaries to be organized more efficiently.

Cloud networking relies heavily on subnetting. Designing subnets affects routing, security boundaries, IP capacity, availability zones, and the placement of workloads such as Kubernetes nodes and load balancers.

### 5. What is DNS?

DNS translates human-readable domain names into information such as IP addresses and service records. It provides a distributed naming system that allows clients to locate services without hard-coding network addresses.

DNS is critical in cloud and Kubernetes environments. Problems with resolution, caching, TTLs, records, or authoritative servers can appear to applications as generic connectivity failures, making DNS knowledge essential for troubleshooting.

### 6. What is NAT?

Network Address Translation modifies IP address information as traffic passes through a network device. It is commonly used to allow private addresses to communicate with external networks using a public address.

In cloud environments, NAT gateways commonly provide outbound Internet connectivity for resources in private subnets. Understanding NAT helps explain why private workloads can initiate external connections without necessarily being directly reachable from the Internet.

### 7. What is routing?

Routing is the process of determining where network packets should be forwarded to reach their destination. Routers use routing tables and protocols to make forwarding decisions.

DevOps Engineers encounter routing through cloud route tables, VPNs, Kubernetes networking, service meshes, and on-premises infrastructure. A correct IP address does not guarantee connectivity if the required return or forward route is missing.

### 8. What is TLS?

TLS is a cryptographic protocol that provides confidentiality, integrity, and authentication for network communication. It is widely used to protect application protocols such as HTTPS.

For DevOps, TLS involves certificates, private keys, certificate authorities, trust chains, protocol versions, and renewal. Incorrect certificates or trust configuration can cause failures even when DNS and TCP connectivity are working correctly.

### 9. What is a firewall?

A firewall controls network traffic according to defined rules, commonly using attributes such as source, destination, port, protocol, or connection state. It establishes a security boundary between network zones.

Cloud security groups, network ACLs, host firewalls, and Kubernetes network policies apply similar concepts at different layers. Effective firewall design follows least privilege while allowing only required communication paths.

### 10. What is a port?

A port is a logical identifier used by transport protocols such as TCP and UDP to distinguish services or communication endpoints on a host. An IP address identifies the host, while the port helps identify the intended service.

For DevOps troubleshooting, checking whether a port is listening, reachable, and permitted through firewalls is fundamental. Tools such as `ss`, `nc`, and connection tests can help distinguish application, network, and security failures.

---

## CLOUD COMPUTING

### 1. What is cloud computing?

Cloud computing provides on-demand access to computing resources through shared infrastructure and programmable interfaces. Resources such as compute, storage, networking, and managed services can be provisioned and scaled without directly managing all underlying hardware.

For DevOps, the key benefit is infrastructure programmability. Cloud resources can be represented as code, automatically provisioned, monitored, secured, and destroyed, enabling repeatable environments and faster operational changes.

### 2. What is elasticity?

Elasticity is the ability of infrastructure to dynamically increase or decrease resources according to workload demand. It differs from simply having a large fixed amount of capacity.

Cloud-native systems use elasticity to handle variable workloads efficiently. Autoscaling can add instances, containers, or nodes when demand increases and remove them when demand falls, provided the application and dependencies can scale accordingly.

### 3. What is the shared responsibility model?

The shared responsibility model defines which security responsibilities belong to the cloud provider and which belong to the customer. The provider typically secures the underlying infrastructure, while customers remain responsible for configured services, identities, data, and workloads.

The exact boundary varies by service model. DevOps Engineers must therefore understand what a managed service protects automatically and what still requires customer configuration, monitoring, patching, or access control.

### 4. What is the difference between IaaS, PaaS, and SaaS?

IaaS provides fundamental infrastructure resources such as virtual machines, networking, and storage. PaaS provides higher-level platforms where the provider manages more of the underlying infrastructure. SaaS delivers complete software applications.

The main difference is the level of abstraction and operational responsibility. DevOps Engineers must understand this boundary because moving toward managed services can reduce operational work but also changes available control and customization.

### 5. What is a cloud region?

A region is a geographic area containing cloud infrastructure designed to provide services within that location. Regions are commonly divided into multiple availability zones to provide fault isolation.

Choosing regions affects latency, regulatory requirements, cost, data residency, and disaster recovery. High-availability architectures may distribute workloads across availability zones or even multiple regions when the business requirements justify the complexity.

### 6. What is an availability zone?

An availability zone is an isolated infrastructure location within a cloud region designed to reduce the impact of localized failures. Multiple zones provide separate failure domains while maintaining relatively low network latency.

Deploying workloads across zones can improve availability, but only if dependencies are also distributed appropriately. A Kubernetes cluster spread across zones, for example, can still have a single-zone database dependency.

### 7. What is cloud autoscaling?

Autoscaling automatically adjusts infrastructure capacity according to defined metrics or policies. It can operate at different levels, such as virtual machines, Kubernetes pods, or managed database capacity.

Autoscaling requires appropriate signals and limits. Scaling too slowly can cause outages, while aggressive scaling can increase costs or overload dependencies. Effective autoscaling therefore combines capacity planning, metrics, cooldown behavior, and application characteristics.

### 8. What is cloud IAM?

Cloud Identity and Access Management controls which identities can perform which actions on which resources. It commonly uses users, groups, roles, policies, and temporary credentials.

IAM is one of the most important security controls in cloud environments. DevOps automation should use dedicated identities with minimum required permissions rather than broad administrator access, and credentials should preferably be short-lived and centrally managed.

### 9. What is cloud-native architecture?

Cloud-native architecture uses practices and technologies designed around automation, elasticity, distributed systems, and managed infrastructure. Common characteristics include containers, orchestration, APIs, immutable deployments, observability, and automated operations.

Cloud-native does not simply mean running something in a cloud provider. The architectural goal is to exploit automation and resilience characteristics while avoiding unnecessary complexity when simpler designs satisfy the requirements.

### 10. What is cloud cost optimization?

Cloud cost optimization means continuously aligning resource usage and architecture with business requirements while maintaining acceptable reliability and performance. It includes right-sizing, scheduling, storage lifecycle management, and architectural decisions.

DevOps Engineers influence cost through infrastructure design and operational practices. Unused resources, oversized instances, excessive logging, unnecessary data transfer, and uncontrolled autoscaling are common sources of cloud waste.

---

## VIRTUALIZATION AND CONTAINERS

### 1. What is virtualization?

Virtualization abstracts physical hardware so that multiple isolated virtual machines can run on the same physical host. A hypervisor manages hardware resources and provides virtual CPUs, memory, storage, and devices to guest operating systems.

Virtual machines provide strong isolation and allow different operating systems to share infrastructure. They are common in cloud platforms and private infrastructure and form an important foundation for many Kubernetes clusters.

### 2. What is the difference between a virtual machine and a container?

A virtual machine virtualizes hardware and normally includes a complete guest operating system. A container isolates application processes while sharing the host operating system kernel.

Containers are generally lighter and faster to start because they do not require a separate kernel per workload. However, they do not provide exactly the same isolation model as virtual machines and still depend on kernel-level security mechanisms.

### 3. What are Linux namespaces?

Linux namespaces isolate resources so that processes can have different views of the system. They can isolate process IDs, networking, mounts, users, hostnames, and other resources.

Containers rely heavily on namespaces to create process and resource isolation. Understanding namespaces helps DevOps Engineers understand what containers actually provide instead of treating containers as lightweight virtual machines.

### 4. What are Linux cgroups?

Control groups, or cgroups, organize processes and control or measure their resource consumption. They can enforce limits and track usage for resources such as CPU and memory.

Container platforms use cgroups to implement resource requests, limits, and accounting. Kubernetes resource controls ultimately depend on these kernel mechanisms, making cgroups important for understanding CPU throttling and memory-related behavior.

### 5. What is a container image?

A container image is an immutable package containing an application and the filesystem content required to execute it. Images are normally built from layers and stored in registries for distribution.

For DevOps, images are the unit of application delivery in many container platforms. Reproducible builds, small images, dependency control, vulnerability scanning, provenance, and immutable tags are important for secure and predictable deployments.

### 6. What is a container runtime?

A container runtime is software responsible for creating and managing containers using operating-system primitives. It handles operations such as image execution, filesystem setup, namespaces, and cgroups.

In Kubernetes, the runtime operates beneath the kubelet and implements the required container execution interface. Understanding this separation helps distinguish Kubernetes orchestration responsibilities from the actual execution of containers.

### 7. Why are containers considered ephemeral?

Containers are commonly treated as ephemeral because their lifecycle is expected to be replaceable and their local state should not be considered durable. A container can be destroyed and recreated as part of normal operations.

This model fits orchestration platforms such as Kubernetes. Persistent data should be stored in appropriate external systems or persistent volumes rather than relying on the writable filesystem of an individual container.

### 8. What is container image immutability?

Image immutability means that an image used for deployment should represent a fixed artifact rather than being modified after it has been built. A new version should normally be represented by a new image.

Immutability improves reproducibility and rollback because the artifact deployed today can be identified and deployed again later. Digest-based references provide stronger guarantees than mutable tags alone.

### 9. Why should containers run as non-root?

Running a container as a non-root user limits the privileges available to the application if it is compromised. Root inside a container is not equivalent to root on the host in every situation, but excessive privileges can increase attack impact.

Security-conscious container deployments therefore use non-root users, drop unnecessary capabilities, restrict filesystem access, and avoid privileged containers unless there is a justified requirement.

### 10. What is orchestration?

Container orchestration automates the deployment, scheduling, networking, scaling, and lifecycle management of containers across infrastructure. Kubernetes is a widely used orchestration platform.

The key value is declarative management: engineers describe the desired state and controllers continuously work toward that state. This creates a foundation for self-healing, scaling, rolling updates, and automated workload placement.

---

## INFRASTRUCTURE AS CODE

### 1. What is Infrastructure as Code?

Infrastructure as Code represents infrastructure configuration using machine-readable definitions that can be versioned, reviewed, tested, and applied automatically. Instead of manually configuring resources, engineers describe the desired infrastructure state.

IaC makes infrastructure changes more repeatable and auditable. For DevOps Engineers, it enables infrastructure to follow software engineering practices such as Git workflows, code review, automated validation, and controlled deployments.

### 2. What is declarative infrastructure?

Declarative infrastructure describes the desired end state rather than specifying every imperative step required to achieve it. The infrastructure tool determines what changes are necessary.

This model is valuable because the same configuration can be repeatedly reconciled against the actual environment. Terraform, Kubernetes manifests, and many cloud configuration systems use declarative approaches.

### 3. What is idempotency in IaC?

Idempotency in Infrastructure as Code means repeatedly applying the same desired configuration should converge on the same infrastructure state rather than creating unintended additional resources.

This property makes automation safer and predictable. If every execution creates another resource instead of reconciling with existing state, infrastructure automation becomes difficult to trust and dangerous to operate.

### 4. What is Terraform state?

Terraform state is the information Terraform maintains about resources it manages and their relationship to the configuration. It allows Terraform to determine what exists and what changes are required.

State is therefore critical infrastructure data. It should be stored securely, protected from concurrent modifications, and backed up appropriately. In team environments, remote state with locking is commonly used to coordinate changes.

### 5. What is drift in Infrastructure as Code?

Drift occurs when the real infrastructure differs from the state described by the IaC configuration. It can happen when someone manually changes resources or when external systems modify them.

Drift reduces confidence in automation because the code no longer represents reality. Regular plan operations, restricted manual changes, and clear ownership boundaries help detect and prevent infrastructure drift.

### 6. What is a Terraform module?

A Terraform module is a reusable collection of Terraform resources and configuration that exposes a defined interface through variables and outputs. Modules can encapsulate repeated infrastructure patterns.

Good modules provide useful abstractions without hiding important behavior. They should have clear responsibilities, controlled inputs, documented outputs, and versioning so teams can reuse infrastructure safely.

### 7. Why should infrastructure changes be reviewed?

Infrastructure changes can modify networks, permissions, compute resources, databases, and production services. A small configuration change can therefore have a much larger operational impact than its size suggests.

Using pull requests and peer review introduces another layer of validation. Reviewers can identify security risks, unintended dependencies, cost implications, and architectural problems before the change reaches an environment.

### 8. What is the difference between imperative and declarative IaC?

Imperative automation specifies the sequence of actions to perform, while declarative IaC describes the desired result. Imperative scripts often require the author to handle the current state explicitly.

Declarative tools can compare desired and actual state and determine the required actions. This generally makes large environments easier to manage, although imperative automation remains useful for procedural tasks that do not fit a state-based model.

### 9. What is infrastructure provisioning?

Infrastructure provisioning is the process of creating and configuring resources required to run workloads. These resources can include networks, virtual machines, clusters, storage, databases, and identities.

Automation turns provisioning into a repeatable process. This supports consistent environments, faster recovery, disaster-recovery procedures, and the ability to reproduce infrastructure from version-controlled definitions.

### 10. Why should secrets not be stored directly in IaC code?

Secrets such as passwords, API keys, and private keys require stronger protection than ordinary configuration. Storing them directly in repositories can expose credentials through Git history, pull requests, logs, or state files.

A better approach is to use dedicated secret-management systems and inject credentials securely at runtime or provisioning time. IaC should reference secret mechanisms rather than becoming a secret storage system.

---

## MONITORING AND OBSERVABILITY

### 1. What is the difference between monitoring and observability?

Monitoring focuses on collecting and evaluating predefined signals to determine whether a system is operating correctly. Observability is the broader ability to understand internal system behavior from externally available outputs.

Monitoring can tell you that latency increased, while observability helps explain why. Metrics, logs, traces, events, profiles, and contextual metadata together provide a more complete view of distributed systems.

### 2. What are the three pillars of observability?

The commonly referenced pillars are metrics, logs, and distributed traces. Metrics provide numerical measurements, logs provide detailed event information, and traces show how requests move across distributed components.

The pillars complement each other rather than replacing one another. Metrics are efficient for detecting problems, logs provide detailed evidence, and traces help connect latency or failures across service boundaries.

### 3. What is a metric?

A metric is a numerical measurement collected over time that represents some property of a system or workload. Examples include request rate, latency, CPU usage, memory usage, and error rate.

Metrics are useful because they can be aggregated, queried, alerted on, and visualized efficiently. Prometheus-style systems commonly represent metrics using a metric name and labels that provide dimensions for analysis.

### 4. What is a log?

A log is a record of an event or message produced by a system. Logs can contain contextual information about application behavior, errors, authentication events, or operational activity.

Structured logs are especially useful because fields can be queried consistently. In distributed environments, including timestamps, request identifiers, service names, and severity information makes logs much easier to correlate and analyze.

### 5. What is distributed tracing?

Distributed tracing records the path of a request across multiple services and components. A trace is composed of spans representing individual operations within that request.

Tracing is particularly valuable in microservice architectures because a user-facing latency problem may originate from a downstream service or dependency. Trace context allows engineers to follow that request across service boundaries.

### 6. What is an SLI?

A Service Level Indicator is a quantitative measurement representing a service's behavior from the perspective relevant to reliability. Examples include successful request percentage or request latency.

An SLI should measure something meaningful to users or business outcomes. Infrastructure metrics can be useful diagnostic signals, but they are not automatically good indicators of whether the service is meeting its reliability expectations.

### 7. What is an SLO?

A Service Level Objective defines a target value or range for an SLI over a specific period. For example, a service may target a certain percentage of successful requests.

SLOs create an explicit reliability target that engineering teams can use for prioritization. They are more useful than vague goals such as "the system should be highly available" because they can be measured and evaluated.

### 8. What is an error budget?

An error budget represents the amount of unreliability permitted by an SLO. If an SLO allows a small percentage of failed requests, that allowed failure becomes the service's budget.

Error budgets create a balance between reliability and change velocity. When the budget is being consumed too quickly, teams may prioritize reliability work; when reliability is healthy, teams have more room for controlled changes.

### 9. What makes an alert useful?

A useful alert identifies a condition that requires human or automated action. It should be actionable, sufficiently specific, and associated with a meaningful operational impact.

Alerts that trigger constantly without requiring action create alert fatigue. Good alerting focuses on symptoms and important failure conditions rather than generating notifications for every unusual metric value.

### 10. Why is observability important for Kubernetes?

Kubernetes introduces multiple layers of abstraction: applications, pods, services, nodes, controllers, networking, and the control plane. A failure can therefore originate in several different layers.

Effective observability provides visibility across these layers and allows engineers to correlate infrastructure behavior with application behavior. Metrics, logs, traces, events, and Kubernetes state together make troubleshooting considerably more effective.

---

## CI/CD

### 1. What is Continuous Integration?

Continuous Integration is the practice of frequently integrating changes into a shared codebase and automatically validating them through builds and tests. The goal is to detect integration problems early.

CI reduces the cost of discovering broken changes because feedback happens close to the commit that introduced the problem. For DevOps Engineers, CI also provides a natural place for security scanning, image building, validation, and artifact generation.

### 2. What is Continuous Delivery?

Continuous Delivery means keeping software in a state where it can be released reliably whenever the business chooses. Automated validation and deployment preparation reduce the effort required to release.

Continuous Delivery does not necessarily mean every change reaches production automatically. The key principle is that the software has a reliable, repeatable path toward production with minimal manual work.

### 3. What is Continuous Deployment?

Continuous Deployment extends Continuous Delivery by automatically releasing validated changes to production without requiring a manual approval for each deployment.

This requires strong automated testing, observability, rollback capabilities, and confidence in the deployment process. Organizations should adopt it when their risk model and engineering maturity support automatic production changes.

### 4. What is a CI/CD pipeline?

A CI/CD pipeline is an automated sequence of activities that takes a change from source code toward a deployable or deployed state. It commonly includes validation, testing, building, packaging, security checks, and deployment.

A good pipeline provides fast feedback while enforcing important quality and security controls. It should also be observable and reproducible so engineers can understand why a deployment succeeded or failed.

### 5. What is an artifact?

An artifact is a versioned output produced by a build process that can be consumed by later stages. Examples include container images, binaries, packages, and deployment bundles.

Using immutable, identifiable artifacts prevents environments from rebuilding different versions of the same source unexpectedly. Promotion should ideally move the same artifact between environments rather than rebuilding it for each stage.

### 6. Why should builds be reproducible?

A reproducible build produces the same or equivalent artifact when given the same source and dependencies. Reproducibility makes debugging, auditing, and rollback significantly easier.

Without reproducibility, an artifact generated today may differ from one generated tomorrow even if the source appears unchanged. Locking dependencies, controlling build environments, and identifying inputs helps reduce this problem.

### 7. What is a deployment strategy?

A deployment strategy defines how a new software version is introduced into an environment. Common strategies include rolling, blue-green, canary, and recreate deployments.

The correct strategy depends on availability requirements, application architecture, rollback speed, infrastructure cost, and risk tolerance. Deployment strategy is therefore an architectural and operational decision rather than simply a CI/CD configuration detail.

### 8. What is a canary deployment?

A canary deployment gradually exposes a new version to a small portion of traffic or users before expanding the rollout. Metrics and error signals are evaluated during the process.

Canary deployments reduce blast radius because problems affect fewer users before the change is fully deployed. They are particularly powerful when combined with automated observability and rollback mechanisms.

### 9. What is GitOps?

GitOps is an operational model where Git repositories represent the desired state of infrastructure or applications, and automated controllers reconcile that state with running environments.

The model provides version history, review workflows, and declarative reconciliation. Tools such as Argo CD apply GitOps principles to Kubernetes by continuously comparing desired manifests with the cluster's actual state.

### 10. Why should CI/CD pipelines be treated as production systems?

CI/CD pipelines can deploy software, modify infrastructure, access credentials, and influence production availability. A compromised or unreliable pipeline can therefore have significant operational and security impact.

Pipelines should have controlled permissions, monitoring, auditing, dependency management, secret protection, and reliable failure handling. They are part of the software supply chain and should receive security and reliability attention accordingly.

---

## TESTS

### 1. Why is software testing important?

Testing provides evidence that software behaves according to defined expectations and helps detect regressions before changes reach users. Different types of tests provide confidence at different levels of the system.

For DevOps, testing is not limited to application code. Infrastructure, deployment manifests, security policies, container images, and automation can also be validated. The goal is to move verification earlier and reduce production surprises.

### 2. What is a unit test?

A unit test validates a small, isolated part of a system, such as a function or class. Dependencies are commonly replaced with controlled substitutes so the behavior of the unit can be tested independently.

Unit tests are generally fast and numerous, making them suitable for frequent execution in CI. Their main value is quickly detecting local logic regressions without requiring a complete environment.

### 3. What is an integration test?

An integration test verifies that multiple components work correctly together. It may involve databases, APIs, queues, filesystems, or other external dependencies.

Integration tests catch problems that unit tests cannot, such as incorrect interfaces, serialization issues, authentication behavior, or database assumptions. They usually require more setup and are therefore slower and more operationally expensive.

### 4. What is an end-to-end test?

An end-to-end test validates a complete user or business workflow across multiple system components. It attempts to test the system from an external perspective.

These tests provide valuable confidence but are usually slower and more fragile than unit tests. They should therefore focus on critical workflows rather than attempting to cover every possible behavior through full-system tests.

### 5. What is the test pyramid?

The test pyramid is a model that encourages having many fast, isolated tests at the lower levels and fewer slower, broader tests at higher levels. Unit tests form the base, integration tests occupy the middle, and end-to-end tests sit near the top.

The principle is about balancing feedback speed, cost, and confidence. A test suite dominated by expensive end-to-end tests can become slow and difficult to maintain.

### 6. What is regression testing?

Regression testing verifies that previously working functionality continues to work after changes are introduced. It protects against unintended side effects.

Automated regression tests are especially valuable in CI/CD because they can run consistently on every relevant change. The test suite should evolve as bugs are discovered so that important failures become permanently detectable.

### 7. What is performance testing?

Performance testing evaluates how a system behaves under defined workloads. It can measure latency, throughput, resource consumption, scalability, and stability.

Performance testing should reflect realistic usage patterns rather than focusing only on maximum theoretical load. Results help identify bottlenecks and establish whether infrastructure and application changes improve or degrade system behavior.

### 8. What is chaos testing?

Chaos testing deliberately introduces controlled failures to determine whether a system behaves as expected under adverse conditions. Examples include terminating instances, introducing latency, or making dependencies unavailable.

The goal is not simply to cause outages but to validate resilience assumptions. Chaos experiments should be controlled, observable, and designed around specific hypotheses and expected recovery behavior.

### 9. What is test isolation?

Test isolation means ensuring that one test does not unintentionally depend on the state or execution of another test. Isolated tests can run independently and produce consistent results.

Isolation is important for reliable CI pipelines because shared state creates flaky tests and makes failures difficult to reproduce. Containers, temporary databases, mocks, and controlled test environments are common techniques for improving isolation.

### 10. What is a flaky test?

A flaky test sometimes passes and sometimes fails without a relevant code change. Flakiness can result from timing assumptions, concurrency, shared state, unstable dependencies, network conditions, or inadequate cleanup.

Flaky tests reduce trust in CI because engineers begin ignoring failures. They should be investigated and fixed rather than permanently retried, since blindly retrying can hide real problems.

---

## DEVSECOPS

### 1. What is DevSecOps?

DevSecOps integrates security practices into development and operations rather than treating security as a separate final-stage activity. Security becomes part of design, coding, building, deployment, and runtime operations.

For DevOps Engineers, this means infrastructure and pipelines should enforce security controls continuously. Examples include vulnerability scanning, secret detection, identity controls, policy validation, secure images, and runtime monitoring.

### 2. What is shift-left security?

Shift-left security means moving security activities earlier in the software development lifecycle. Instead of discovering vulnerabilities only after deployment, teams identify and address them during development and CI.

Earlier detection generally reduces remediation cost and shortens feedback loops. However, shift-left does not mean eliminating runtime security; production environments still require monitoring, access control, detection, and response.

### 3. What is vulnerability management?

Vulnerability management is the continuous process of identifying, evaluating, prioritizing, remediating, and tracking security weaknesses.

Not every vulnerability has the same operational risk. Prioritization should consider severity, exploitability, exposure, affected assets, and business impact. Automated scanning provides visibility, but remediation requires ownership and defined processes.

### 4. What is a software supply chain?

The software supply chain includes all components and processes involved in producing and delivering software, including source code, dependencies, build systems, artifacts, registries, and deployment mechanisms.

A compromise anywhere in this chain can affect production. DevSecOps therefore includes dependency management, artifact integrity, provenance, access control, build isolation, image scanning, and verification of what is actually deployed.

### 5. What is SAST?

Static Application Security Testing analyzes source code or compiled representations without executing the application to identify potential security weaknesses.

SAST can be integrated into CI to provide early feedback to developers. Its results still require contextual analysis because automated tools can produce false positives and cannot understand every application's intended behavior.

### 6. What is DAST?

Dynamic Application Security Testing evaluates a running application from an external perspective. It attempts to identify vulnerabilities by interacting with the application rather than analyzing its source code.

DAST complements SAST because runtime behavior and deployed configuration can expose issues that static analysis misses. It is particularly useful for validating web applications and APIs in controlled environments.

### 7. What is container image scanning?

Container image scanning analyzes image contents for known vulnerabilities, insecure packages, and sometimes configuration or secret-related problems.

Scanning is useful during the build process because vulnerable artifacts can be detected before deployment. However, scanners are not a complete security solution; vulnerabilities can change over time and runtime configuration also affects actual risk.

### 8. What is policy as code?

Policy as code represents security, compliance, or operational rules in machine-readable form that can be automatically evaluated. Policies can validate infrastructure, Kubernetes resources, CI pipelines, or cloud configurations.

This approach turns organizational requirements into repeatable controls. Instead of relying entirely on manual reviews, teams can prevent or detect violations consistently across environments.

### 9. What is least privilege?

Least privilege means granting an identity or process only the permissions required to perform its intended responsibilities. Excess permissions increase the potential impact of compromised credentials or workloads.

In DevSecOps, least privilege applies to cloud IAM, Kubernetes service accounts, CI runners, deployment tools, containers, and human access. Permissions should be reviewed periodically because requirements and architectures change.

### 10. What is secret management?

Secret management is the controlled storage, distribution, rotation, and auditing of sensitive credentials such as passwords, tokens, and private keys.

Secrets should not normally be embedded in source code, container images, or plaintext configuration repositories. Dedicated secret-management systems can provide encryption, access control, auditing, and automated rotation.

---

## DEVOPS

### 1. What is DevOps?

DevOps is a set of cultural, organizational, and technical practices that improve collaboration between development and operations while enabling faster and more reliable software delivery.

It is not simply a job title or a collection of tools. Automation, shared ownership, feedback loops, continuous improvement, observability, and reducing unnecessary handoffs are central principles of DevOps.

### 2. What is the relationship between development and operations?

Development focuses primarily on creating and evolving software, while operations focuses on running systems reliably. DevOps aims to reduce the separation between these responsibilities and create shared ownership of the complete service lifecycle.

For DevOps Engineers, this means understanding both how software is built and how it behaves in production. Operational feedback should influence development decisions, while developers should understand the consequences of the systems they create.

### 3. What is automation in DevOps?

Automation uses software and repeatable processes to perform tasks that would otherwise require manual human intervention. It can cover testing, infrastructure provisioning, deployments, configuration, security checks, and operational responses.

The goal is not to automate everything blindly. Good automation reduces repetitive work, improves consistency, decreases human error, and creates reliable processes that can be executed repeatedly.

### 4. What is continuous improvement?

Continuous improvement means regularly evaluating processes, systems, and outcomes to identify opportunities for incremental improvement. DevOps encourages teams to learn from both successes and failures.

Metrics, incident reviews, deployment data, customer feedback, and engineering experience can all provide inputs. The objective is not perfection but creating feedback loops that progressively improve reliability and delivery.

### 5. What is a feedback loop in DevOps?

A feedback loop is a mechanism that provides information about the result of an action so that the next decision can be improved. Faster and higher-quality feedback generally enables teams to correct problems sooner.

CI provides feedback about code changes, observability provides feedback about production behavior, and incident reviews provide feedback about operational processes. DevOps connects these feedback sources into a continuous learning cycle.

### 6. What is the value of version control in DevOps?

Version control records changes to source code, infrastructure, configuration, and documentation over time. It enables collaboration, review, rollback, and traceability.

Git-based workflows are especially important because they allow infrastructure and application changes to use similar engineering practices. A change can be proposed, reviewed, automatically validated, and later associated with the exact version deployed.

### 7. What is configuration management?

Configuration management is the practice of controlling system configuration so that environments remain consistent and predictable. It can include operating-system settings, application configuration, packages, and services.

Automation is important because manually configured environments tend to diverge over time. Desired configuration should be represented in a repeatable form whenever practical, allowing systems to be recreated or corrected automatically.

### 8. What is infrastructure automation?

Infrastructure automation uses software and declarative or procedural mechanisms to provision, configure, modify, and operate infrastructure.

It reduces dependence on manual procedures and makes infrastructure changes repeatable. IaC, configuration management, cloud APIs, Kubernetes controllers, and automation pipelines are all examples of mechanisms used to achieve this goal.

### 9. What is an incident postmortem?

An incident postmortem is a structured review of an operational failure that examines what happened, why it happened, how it was detected, and how recurrence can be reduced.

Effective postmortems are generally blameless and focus on system conditions rather than individual fault. Their purpose is organizational learning and concrete improvement, not punishment.

### 10. What is the difference between DevOps and Platform Engineering?

DevOps is a broad set of principles and practices for improving software delivery and operational collaboration. Platform Engineering focuses on building internal platforms and reusable capabilities that make those practices easier for development teams.

A platform may provide standardized Kubernetes environments, deployment workflows, observability, security controls, and self-service infrastructure. Platform Engineering can therefore be viewed as one way of implementing DevOps principles at organizational scale.

---

## SECURITY

### 1. What is the CIA triad?

The CIA triad represents confidentiality, integrity, and availability. Confidentiality protects information from unauthorized access, integrity protects information from unauthorized modification, and availability ensures authorized users can access systems when needed.

These principles provide a simple framework for evaluating security requirements. A system can be technically secure in one dimension while failing badly in another, so security design must consider all three.

### 2. What is authentication?

Authentication is the process of verifying the identity of a user, service, or system. Common mechanisms include passwords, certificates, tokens, and cryptographic credentials.

Authentication answers "who are you?" while authorization determines what that identity can do. In cloud and Kubernetes environments, strong authentication combined with short-lived credentials and centralized identity management reduces credential-related risk.

### 3. What is authorization?

Authorization determines which actions an authenticated identity is permitted to perform on specific resources. It is usually implemented through roles, policies, permissions, or access-control lists.

Authorization should follow least privilege and deny unnecessary access by default. In DevOps environments, authorization applies to cloud APIs, Kubernetes resources, Git repositories, CI/CD systems, monitoring platforms, and infrastructure tools.

### 4. What is encryption?

Encryption transforms data into a form that cannot be meaningfully read without the appropriate cryptographic key. It protects confidentiality both while data is stored and while it is transmitted.

DevOps Engineers commonly encounter encryption through TLS, encrypted disks, encrypted object storage, database encryption, and Kubernetes secrets. Encryption is strongest when combined with proper key management and access controls.

### 5. What is hashing?

Hashing transforms input data into a fixed-size value using a one-way mathematical function. A secure cryptographic hash is designed to make it computationally difficult to recover the original input or find another input with the same hash.

Hashes are useful for integrity verification, password storage when using appropriate password-hashing algorithms, and artifact identification. Hashing should not be confused with encryption because hashes are not intended to be decrypted.

### 6. What is defense in depth?

Defense in depth uses multiple independent security controls so that failure of one control does not automatically compromise the entire system.

For example, a cloud workload can combine IAM restrictions, network segmentation, container hardening, vulnerability scanning, runtime monitoring, and encrypted storage. The objective is to reduce the probability and impact of a successful attack.

### 7. What is network segmentation?

Network segmentation divides infrastructure into separate network zones or communication boundaries. The goal is to limit which systems can communicate and reduce lateral movement during a compromise.

Cloud VPCs, subnets, security groups, firewalls, and Kubernetes NetworkPolicies can implement different forms of segmentation. Segmentation should reflect actual communication requirements rather than simply creating arbitrary network complexity.

### 8. What is a security vulnerability?

A vulnerability is a weakness in software, configuration, architecture, or process that can potentially be exploited to violate a security property.

A vulnerability does not automatically mean a system is compromised. Risk depends on factors such as exploitability, exposure, privileges required, affected assets, and business impact. Effective security therefore combines vulnerability discovery with contextual risk management.

### 9. What is threat modeling?

Threat modeling is a structured process for identifying potential threats, attack paths, trust boundaries, and security requirements before or during system design.

For DevOps Engineers, threat modeling can be applied to cloud architectures, Kubernetes clusters, CI/CD pipelines, APIs, and infrastructure. Thinking about how an attacker could move through the system often reveals risks that tool-based scanning alone cannot identify.

### 10. What is zero trust?

Zero trust is a security approach based on the principle that access should not be implicitly trusted simply because a user or workload is inside a particular network.

Access decisions should consider identity, resource, context, and policy, with authentication and authorization applied explicitly. In cloud-native environments, this aligns well with identity-based access, short-lived credentials, workload isolation, and fine-grained network policies.
