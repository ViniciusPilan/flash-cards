## Kubernetes (Admin - CKA)

### 1. What is the role of the Kubernetes control plane?

The control plane manages the desired state of the cluster. The API server exposes the Kubernetes API, the scheduler assigns Pods to nodes, the controller manager reconciles resources, and etcd stores cluster state.

For a DevOps Engineer, understanding these responsibilities helps diagnose failures. A scheduling problem, API problem, and node problem originate in different control-plane or worker components.

### 2. How does Kubernetes scheduling work?

The scheduler selects a suitable node for each unscheduled Pod by evaluating constraints such as resource requests, node selectors, affinity, taints, and tolerations. It then assigns the Pod to the selected node.

The scheduler does not run containers itself. It makes placement decisions, while the kubelet on the selected node communicates with the container runtime to create and manage the workload.

### 3. What is the purpose of etcd in Kubernetes?

etcd is Kubernetes' distributed key-value store and contains the cluster's authoritative state. Kubernetes resources such as Deployments, Services, Secrets, and configuration objects are persisted there.

Because etcd is critical to cluster recovery, administrators must protect it with authentication, encryption, backups, and reliable storage. Losing etcd without a valid backup can mean losing the cluster's desired state.

### 4. What is the difference between a Deployment and a StatefulSet?

A Deployment manages stateless workloads where Pods are generally interchangeable. Kubernetes can replace them with new Pods without requiring stable identities or persistent storage associations.

A StatefulSet provides stable Pod identities, predictable ordering, and persistent storage associations. It is appropriate when applications require identity or ordered operations, such as databases and distributed systems.

### 5. How do Kubernetes Services provide stable networking?

Pods are ephemeral and their IP addresses can change when they are recreated. A Service provides a stable virtual IP and DNS name that represents a group of Pods selected through labels.

The Service therefore decouples clients from individual Pod instances. Kubernetes can update the backend endpoints as Pods are created, removed, or replaced without requiring clients to know their changing addresses.

---

## Kubernetes (Dev/User - CKAD)

### 1. What is the difference between a Pod and a container?

A container is an isolated process packaged with its application and dependencies. A Pod is the smallest deployable unit in Kubernetes and can contain one or more containers that share networking and storage.

Most applications use one main container per Pod, while sidecars are useful when another container must closely cooperate with the application, such as a proxy or log collector.

### 2. Why are Kubernetes resource requests and limits important?

Requests define how much CPU and memory a container expects to need and are primarily used by the scheduler when selecting a node. Limits define the maximum resources the container can consume.

Correct values improve scheduling and workload isolation. Excessively low limits can cause throttling or OOM kills, while excessively high requests can waste cluster capacity and prevent efficient scheduling.

### 3. What is the difference between ConfigMaps and Secrets?

ConfigMaps store non-sensitive configuration such as application settings, environment variables, or configuration files. Secrets are designed for sensitive values such as credentials, tokens, and certificates.

Both can be consumed by Pods as environment variables or mounted files. However, Secrets should not be treated as automatically secure simply because they use a different resource type; access control and encryption at rest are still important.

### 4. How do liveness and readiness probes differ?

A liveness probe determines whether a container should be restarted because it is unhealthy. A readiness probe determines whether the application is currently able to receive traffic.

This distinction is important for highly available workloads. A temporarily overloaded application can fail readiness without being restarted, allowing Kubernetes to remove it from Service endpoints while it recovers.

### 5. What problem do Deployments solve?

A Deployment manages the lifecycle of replicated stateless Pods and provides declarative updates and rollbacks. Instead of manually creating individual Pods, you describe the desired number of replicas and the container configuration.

The Deployment controller continuously reconciles the actual state with that desired state. This makes application releases repeatable and allows Kubernetes to progressively replace old Pods with new versions.

---

## Kubernetes (Admin/Sec Engineer - CKS)

### 1. What does the principle of least privilege mean in Kubernetes?

Least privilege means granting workloads and users only the permissions they actually need. In Kubernetes, this applies to RBAC permissions, Linux capabilities, service accounts, network access, and filesystem permissions.

For workloads, unnecessary privileges increase the impact of a compromise. A secure design therefore minimizes permissions, avoids privileged containers, uses dedicated service accounts, and restricts access to required resources.

### 2. What is the purpose of Kubernetes RBAC?

RBAC controls which identities can perform which actions against Kubernetes resources. Roles define permissions, while RoleBindings or ClusterRoleBindings associate those permissions with users, groups, or service accounts.

A secure cluster should avoid broad permissions such as unrestricted cluster administration. Permissions should be scoped to the smallest namespace and resource set required by the workload or operator.

### 3. Why should containers avoid running as root?

Running a container as root increases the potential impact of a container compromise. If an attacker exploits the application, root privileges inside the container can provide additional opportunities for privilege escalation or interaction with the host.

Security contexts can enforce non-root execution, read-only filesystems, dropped capabilities, and other restrictions. These controls reduce the attack surface even when an application vulnerability exists.

### 4. What is the purpose of Pod Security Standards?

Pod Security Standards define security expectations for Kubernetes Pods through profiles such as Privileged, Baseline, and Restricted. They provide a consistent way to prevent dangerous workload configurations.

The Restricted profile applies stronger controls, including restrictions around privileged containers, host namespaces, capabilities, and privilege escalation. Administrators can use these policies to establish security boundaries across namespaces.

### 5. Why is network segmentation important in Kubernetes?

By default, Kubernetes networking can allow broad communication between Pods, depending on the networking implementation. NetworkPolicies provide rules that restrict ingress and egress traffic between workloads.

Segmentation limits lateral movement after a compromise. A secure application should explicitly define which services need to communicate instead of assuming that every workload in the cluster should be reachable.

---

## Docker

### 1. What is the difference between a container and an image?

A Docker image is an immutable package containing the filesystem layers and metadata required to create a container. A container is a runtime instance created from an image.

Images provide reproducibility because the same image can be deployed across environments. Containers add runtime state and isolation around the application process while sharing the host kernel.

### 2. Why are Docker images built in layers?

Docker images are composed of filesystem layers created by image-building instructions. Layers can be reused between images, which reduces storage requirements and improves build performance.

Understanding layers also helps optimize Dockerfiles. Stable dependencies should generally be placed in reusable layers, while frequently changing application content can be placed later to maximize build-cache effectiveness.

### 3. What is the purpose of a Dockerfile?

A Dockerfile defines how an image should be built. It describes the base image, dependencies, files, environment variables, exposed ports, and command used to start the application.

For DevOps workflows, Dockerfiles provide a reproducible and version-controlled way to create application artifacts. Good Dockerfiles also minimize image size, reduce unnecessary packages, and avoid embedding secrets.

### 4. What is the difference between CMD and ENTRYPOINT?

ENTRYPOINT defines the primary executable that a container is intended to run, while CMD provides default arguments or a default command. Their behavior also depends on whether the Dockerfile uses shell or exec syntax.

A common pattern is to use ENTRYPOINT for the application's executable and CMD for default arguments. This allows users to override parameters without replacing the application's main executable.

### 5. Why should containers be treated as ephemeral?

Containers are designed to be replaceable instances rather than permanent servers. Their lifecycle can end because of deployments, failures, scaling, or node replacement.

Persistent application data should therefore be stored outside the container's writable layer, using volumes or external storage when appropriate. This design makes workloads easier to recreate, scale, and recover.

---

## AWS

### 1. What is the AWS shared responsibility model?

The shared responsibility model defines which security responsibilities belong to AWS and which belong to the customer. AWS secures the underlying cloud infrastructure, while customers remain responsible for areas such as identities, data, configurations, and workloads.

The exact responsibilities depend on the service. Using a managed service does not eliminate security responsibilities; it changes which infrastructure layers AWS operates on the customer's behalf.

### 2. What is the principle of least privilege in AWS IAM?

IAM least privilege means granting identities only the permissions required to perform their responsibilities. Permissions should be scoped to specific actions, resources, and conditions whenever practical.

This reduces the potential impact of compromised credentials or workloads. In DevOps environments, roles and temporary credentials are generally preferable to distributing long-lived access keys.

### 3. What is the difference between an Availability Zone and a Region?

An AWS Region is a geographic area containing multiple isolated Availability Zones. An Availability Zone is an independent infrastructure location designed to provide isolation from failures in other zones within the Region.

Deploying workloads across multiple Availability Zones improves availability because a failure affecting one zone does not necessarily take down the entire application.

### 4. What is the purpose of a VPC?

A VPC provides an isolated virtual network in AWS where resources such as EC2 instances, load balancers, and managed services can communicate through controlled networking.

It contains components such as subnets, route tables, security groups, and network ACLs. Proper VPC design establishes network boundaries and controls how workloads communicate with internal and external systems.

### 5. What is the difference between Security Groups and Network ACLs?

Security Groups are stateful virtual firewalls associated with resources such as network interfaces. They control allowed inbound and outbound traffic and automatically account for return traffic.

Network ACLs operate at the subnet level and are stateless, meaning return traffic must be explicitly allowed. Security Groups are commonly used for workload-level access control, while ACLs can provide an additional subnet boundary.

---

## Istio

### 1. What problem does a service mesh solve?

A service mesh provides a dedicated infrastructure layer for managing communication between services. It can centralize capabilities such as traffic management, encryption, telemetry, retries, and authorization.

Instead of implementing these concerns independently in every application, the mesh handles them through proxies and control-plane configuration. This allows application teams to focus more on business logic.

### 2. What is the role of the Istio data plane?

The data plane handles the actual traffic flowing between workloads. In Istio, this functionality is primarily provided by Envoy proxies deployed alongside application workloads.

The proxies can enforce traffic policies, establish mTLS connections, collect telemetry, and perform routing behavior. The Istio control plane configures these proxies but does not directly proxy application traffic.

### 3. What is mTLS and why is it useful in Istio?

Mutual TLS encrypts communication while also authenticating both sides of a connection. Unlike standard TLS, both the client and server prove their identities using certificates.

Istio can automate certificate issuance, rotation, and workload identity management. This allows services to communicate securely without requiring every application to implement its own certificate-management logic.

### 4. What are VirtualServices and DestinationRules?

A VirtualService defines how traffic is routed to services, including rules based on hosts, paths, headers, or other request properties. It can support patterns such as canary deployments and traffic splitting.

A DestinationRule defines policies applied to traffic after routing, including subsets, load-balancing behavior, and connection settings. Together, they provide fine-grained traffic management.

### 5. What is the purpose of Istio gateways?

Istio Gateways define how traffic enters or leaves the mesh at the network boundary. They provide a controlled point where external traffic can be exposed and associated with routing configuration.

An ingress gateway typically receives traffic from outside the cluster and forwards it to internal services. This separates edge traffic handling from application workloads and allows centralized security and routing policies.

---

## Prometheus

### 1. What is the Prometheus data model?

Prometheus stores metrics as time series identified by a metric name and a set of labels. Each time series contains timestamped numeric samples representing the value of that metric over time.

Labels make metrics multidimensional and allow queries to select subsets of data. However, excessive or unbounded label cardinality can significantly increase memory and storage consumption.

### 2. What is the difference between metrics and logs?

Metrics represent numerical measurements over time, such as request rate, latency, CPU usage, or error counts. They are efficient for aggregation and detecting trends or conditions.

Logs contain discrete records of events and usually provide more contextual detail. In observability systems, metrics can indicate that something is wrong, while logs can help explain specific events related to the problem.

### 3. What is PromQL?

PromQL is Prometheus' query language for selecting, filtering, aggregating, and calculating values from time-series data. It can combine metrics using operators and functions to produce useful operational information.

For example, engineers can calculate request rates, error percentages, or resource utilization rather than relying only on raw metrics. PromQL is therefore fundamental for dashboards and alerting.

### 4. What is the difference between counters and gauges?

A counter represents a value that generally increases over time, such as the number of HTTP requests or errors. It can reset when the process restarts, and functions such as rate can calculate its change over time.

A gauge represents a value that can increase or decrease, such as memory usage, queue depth, or temperature. Choosing the correct metric type is important for producing meaningful queries and alerts.

### 5. What makes a good Prometheus alert?

A good alert represents an actionable condition rather than simply detecting that a metric changed. It should identify a situation that requires human or automated intervention and provide enough context to investigate it.

Alerts should also account for duration and normal operational behavior. For example, alerting on sustained high error rates is generally more useful than triggering on a brief, harmless spike.

---

## Karpenter

### 1. What problem does Karpenter solve?

Karpenter dynamically provisions compute capacity based on unschedulable Kubernetes Pods. Instead of relying only on predefined node groups, it evaluates workload requirements and selects suitable infrastructure.

This allows clusters to respond more flexibly to changing workloads. Karpenter can provision nodes with different instance types and capacity characteristics while optimizing for scheduling requirements and cost.

### 2. How does Karpenter decide which nodes to provision?

Karpenter observes Pods that cannot currently be scheduled and evaluates their resource requests and scheduling constraints. It then determines what node capacity can satisfy those requirements.

Constraints can include CPU, memory, architecture, zones, instance characteristics, taints, and other scheduling requirements. The resulting node is selected to satisfy the workload while considering available capacity options.

### 3. How is Karpenter different from Kubernetes Cluster Autoscaler?

Cluster Autoscaler generally adjusts the size of existing node groups based on pending Pods. Karpenter can provision nodes directly and choose from a broader set of instance types and characteristics.

This gives Karpenter more flexibility in heterogeneous environments. The choice depends on the infrastructure model, operational requirements, and whether predefined node groups or dynamic provisioning better fit the platform.

### 4. Why are Pod resource requests important for Karpenter?

Karpenter uses Pod scheduling requirements to determine what capacity is necessary. CPU and memory requests therefore provide important information about the capacity required to place workloads.

If requests are inaccurate, provisioning decisions can also become inefficient. Underestimated requests can lead to resource pressure, while excessive requests can cause unnecessary node provisioning and increased infrastructure cost.

### 5. How does Karpenter help optimize cloud costs?

Karpenter can select appropriate instance types based on workload requirements instead of forcing workloads into a fixed node-group structure. It can therefore take advantage of different capacity options and more efficient instance configurations.

It can also consolidate workloads when possible, reducing unused capacity. Cost optimization should still consider availability, interruption risk, workload constraints, and performance rather than selecting infrastructure based only on price.

---

## ArgoCD

### 1. What is GitOps and how does ArgoCD implement it?

GitOps uses Git as the source of truth for declarative infrastructure and application configuration. Desired state is stored in version control, while automation continuously reconciles the environment with that state.

ArgoCD implements this model for Kubernetes by comparing the desired manifests in Git with the live cluster state. It can detect differences and synchronize the cluster to the declared configuration.

### 2. What is the difference between desired state and live state in ArgoCD?

Desired state is the Kubernetes configuration declared in the configured Git repository. Live state represents the resources that currently exist in the target Kubernetes cluster.

ArgoCD continuously compares these states. When they differ, the application becomes OutOfSync, allowing engineers to identify configuration drift and optionally synchronize the cluster back to the desired state.

### 3. What is an ArgoCD Application?

An ArgoCD Application is a declarative definition that connects a source of Kubernetes configuration with a destination cluster and namespace. It tells ArgoCD what should be deployed and where.

This abstraction allows ArgoCD to manage applications consistently across environments. An Application can point to plain manifests, Helm charts, Kustomize configurations, or other supported sources.

### 4. What is automated synchronization in ArgoCD?

Automated synchronization allows ArgoCD to apply changes from the desired Git state to the Kubernetes cluster without requiring a manual sync operation.

When a repository changes, ArgoCD detects the new desired state and can reconcile the cluster automatically. This supports continuous delivery while preserving Git as the source of truth.

### 5. Why is drift detection important in GitOps?

Drift occurs when the live cluster differs from the configuration declared in Git. It can happen through manual changes, external controllers, emergency modifications, or configuration mistakes.

Detecting drift improves operational consistency because engineers can identify changes that bypassed the intended deployment process. Depending on the design, ArgoCD can report or automatically correct that drift.

---

## Python

### 1. Why is Python commonly used in DevOps?

Python provides a readable syntax, extensive standard library, and a large ecosystem for APIs, cloud services, automation, data processing, and infrastructure tooling. It is therefore useful for both small scripts and larger automation systems.

For a DevOps Engineer, Python is particularly valuable when shell scripting becomes difficult to maintain or when integrations require structured data, API clients, error handling, and reusable abstractions.

### 2. What is the difference between a list, tuple, and dictionary?

A list is an ordered, mutable collection. A tuple is an ordered collection that is immutable after creation. A dictionary stores key-value pairs and provides efficient access through keys.

Choosing the appropriate structure improves code clarity and correctness. Lists are useful for collections that change, tuples for fixed groups of values, and dictionaries for representing structured mappings or configuration data.

### 3. Why are exceptions important in Python automation?

Exceptions provide a structured mechanism for handling failures without relying only on return codes or manually checking every operation. Code can raise an exception when an operation cannot be completed and handle it at an appropriate level.

Reliable automation should distinguish expected failures from unexpected ones, log useful context, and return meaningful exit status or results. Silently ignoring exceptions can create dangerous infrastructure automation.

### 4. What is a virtual environment in Python?

A virtual environment isolates Python packages for a particular project. It prevents dependencies installed for one project from interfering with dependencies required by another project.

This improves reproducibility and dependency management. In DevOps automation, isolated environments make it easier to build predictable tooling and avoid problems caused by incompatible versions installed globally.

### 5. What is the purpose of modules and packages in Python?

A module is typically a Python file containing reusable code, while a package organizes related modules into a structured namespace. They allow applications to separate responsibilities instead of placing everything into one script.

For automation projects, this separation improves maintainability, testing, and reuse. Functions related to AWS, Kubernetes, configuration, or command execution can be isolated into appropriate modules.

---

## Shell Script

### 1. Why is shell scripting useful for DevOps Engineers?

Shell scripts provide a direct way to automate operating-system commands, process files, manage processes, and combine existing Unix tools. They are particularly effective for simple operational tasks and command-line workflows.

However, shell becomes harder to maintain as logic grows. A good DevOps Engineer should recognize when a task is naturally suited to shell and when Python or another language provides safer structure and better maintainability.

### 2. What is the purpose of `set -euo pipefail`?

`set -e` causes a script to stop when a command fails, `-u` treats references to undefined variables as errors, and `pipefail` causes a pipeline to fail when an intermediate command fails.

Together, these options make scripts fail more predictably. They do not replace proper error handling, but they reduce common cases where a script silently continues after an unexpected failure.

### 3. What is the difference between `$?` and `$!`?

`$?` contains the exit status of the most recently executed command. A value of zero normally indicates success, while a non-zero value indicates failure.

`$!` contains the process ID of the most recently started background command. This is useful when a script starts asynchronous processes and needs to later wait for or inspect those processes.

### 4. Why should shell variables usually be quoted?

Quoting variables prevents the shell from unexpectedly performing word splitting and pathname expansion on their contents. Without quotes, values containing spaces or wildcard characters can be interpreted differently than intended.

For example, using `"$file"` is generally safer than `$file` when handling paths or user-provided values. Proper quoting is an important defensive practice in shell automation.

### 5. What is the difference between a process and a command in shell scripting?

A command is an instruction executed by the shell, while a process is a running instance of a program. Executing a command can result in a new process, but shell built-ins may execute directly within the shell process.

Understanding this distinction is useful when managing background jobs, signals, process IDs, and resource consumption. It also helps explain how shell scripts interact with the operating system.

---

## GO

### 1. Why is Go commonly used for infrastructure tooling?

Go provides compiled binaries, strong concurrency primitives, static typing, and a relatively simple language. A program can often be distributed as a single binary without requiring a runtime environment.

These characteristics make Go well suited for infrastructure and cloud-native tooling. Many Kubernetes ecosystem projects use Go because it provides efficient execution, portability, and strong support for concurrent network-oriented workloads.

### 2. What are goroutines in Go?

A goroutine is a lightweight concurrent function managed by the Go runtime. It allows a program to perform multiple operations concurrently without requiring a traditional operating-system thread for every task.

Goroutines are useful for infrastructure tools that perform many independent operations, such as API requests or monitoring tasks. However, concurrency still requires careful synchronization to avoid races and inconsistent shared state.

### 3. What is a Go interface?

An interface defines a set of methods that a type must implement. A type satisfies an interface implicitly by providing those methods, without explicitly declaring that it implements the interface.

This enables components to depend on behavior rather than concrete implementations. In infrastructure code, interfaces are particularly useful for testing, abstraction, and replacing external systems with mock implementations.

### 4. How does error handling work in Go?

Go commonly represents errors as returned values rather than using exceptions for normal error handling. Functions frequently return both a result and an error, allowing callers to explicitly decide how to handle failure.

This makes error paths visible in the code. For DevOps tooling, explicit error handling is valuable because failures involving APIs, files, processes, and infrastructure should generally be handled rather than silently ignored.

### 5. What is the purpose of `defer` in Go?

`defer` schedules a function call to execute when the surrounding function returns. It is commonly used for cleanup operations such as closing files, releasing resources, or unlocking a mutex.

Using `defer` keeps cleanup close to the resource acquisition logic. This reduces the chance of forgetting cleanup when a function has multiple return paths caused by errors or conditional execution.

---

## Linux

### 1. What is the Linux process model?

In Linux, running programs execute as processes, each with an identifier called a PID. Processes have attributes such as ownership, environment, file descriptors, resource limits, and relationships with other processes.

Understanding processes is fundamental for DevOps troubleshooting. Tools such as `ps`, `top`, `kill`, and `strace` allow engineers to inspect process behavior, resource usage, signals, and system interactions.

### 2. What are file descriptors in Linux?

A file descriptor is a numeric reference to an open resource used by a process. Standard descriptors include stdin, stdout, and stderr, while files, sockets, pipes, and other resources can also be represented by descriptors.

This abstraction allows Linux programs to interact with many resources through consistent interfaces. Understanding file descriptors is particularly important when debugging logs, pipelines, network services, and redirected output.

### 3. What is the Linux permission model?

Linux permissions determine who can read, write, or execute a filesystem object. Traditional permissions are divided between the owner, group, and others, while additional mechanisms such as ACLs provide more granular control.

Permissions are a fundamental security boundary for Linux workloads. DevOps Engineers should understand ownership, modes, groups, and privilege escalation because many container and server security issues involve incorrect filesystem permissions.

### 4. What is the difference between a process and a thread in Linux?

A process provides an execution environment with its own virtual memory space and system resources. Threads are execution units within a process and share resources such as memory and file descriptors.

Threads are generally cheaper to create and communicate through shared memory, but that sharing introduces synchronization concerns. Understanding both concepts helps when troubleshooting application performance and resource consumption.

### 5. What is the Linux kernel responsible for?

The Linux kernel is the core component that manages hardware and provides fundamental services to user-space programs. It handles processes, memory, networking, storage, devices, scheduling, and system calls.

Applications normally interact with these capabilities through system calls rather than directly controlling hardware. For DevOps Engineers, understanding this boundary helps explain container isolation, resource limits, networking, and system-level troubleshooting.
