# OS & Networking

### 1. What happens when you type `curl https://example.com` in a Linux terminal?

The system resolves the domain through DNS, establishes a TCP connection to the destination IP, performs the TLS handshake for HTTPS, sends the HTTP request, receives the response, and then `curl` displays it. The network stack, routing table, firewall rules, and DNS configuration all participate in this process.

### 2. What is the difference between a process and a thread in Linux?

A process has its own memory space and system resources, while threads are execution units within a process that share the same memory space. Threads are cheaper to create and communicate between, but problems in one thread can affect the entire process.

### 3. How would you troubleshoot a server that cannot reach another server?

I would first verify basic connectivity with `ping` if ICMP is allowed, then check DNS resolution, routing with `ip route`, connectivity to the specific port with tools such as `nc`, and finally inspect firewall rules and application-level errors. I would determine whether the problem is DNS, routing, network filtering, or the application itself.

### 4. What is the difference between TCP and UDP?

TCP is connection-oriented and provides reliable, ordered delivery with retransmission and flow control. UDP is connectionless and does not guarantee delivery or ordering, but it has lower overhead and is useful when speed is more important than reliability, such as DNS, streaming, and some real-time applications.

### 5. What is the difference between `requests` and `limits` in Linux/Kubernetes-style resource management?

A resource request represents the amount of CPU or memory an application needs to be scheduled reliably, while a limit defines the maximum amount it can consume. In Kubernetes, requests influence scheduling and limits enforce consumption boundaries, with memory limits potentially causing an OOM kill when exceeded.

---

# Cloud Computing

### 1. What is the difference between a public and private subnet in a cloud environment?

A public subnet has a route that allows traffic to reach the internet, typically through an internet gateway. A private subnet does not directly expose its instances to the internet and commonly uses a NAT gateway or equivalent mechanism for outbound internet access.

### 2. How would you design a highly available application in the cloud?

I would distribute the application across multiple availability zones, use load balancing, deploy multiple application instances, and use highly available managed services for databases and other critical dependencies. I would also design for failure rather than assuming individual instances or zones will always be available.

### 3. What is the difference between horizontal and vertical scaling?

Vertical scaling means giving an existing machine more CPU, memory, or other resources. Horizontal scaling means adding more instances and distributing the workload between them. Cloud-native applications generally favor horizontal scaling because it provides better elasticity and fault tolerance.

### 4. What is an IAM role and why is it preferable to static credentials?

An IAM role provides temporary permissions that can be assumed by users, workloads, or cloud services. It is preferable to static credentials because credentials do not need to be embedded in applications or stored permanently, reducing the risk of credential leakage.

### 5. What would you check if a cloud application suddenly became very expensive?

I would first identify which service and resource caused the increase, then investigate metrics such as instance count, storage growth, network traffic, requests, and database consumption. I would also check for infrastructure changes, runaway workloads, unexpected traffic, and resources that were created but no longer needed.

---

# Infrastructure as Code

### 1. What is Terraform state and why is it important?

Terraform state maps the infrastructure that actually exists to the resources defined in the Terraform configuration. Terraform uses it to determine what needs to be created, modified, or destroyed. In a team, the state should normally be stored remotely with locking and appropriate access control.

### 2. What is the difference between Terraform `plan` and `apply`?

`terraform plan` calculates and displays the changes Terraform intends to make without changing the infrastructure. `terraform apply` executes those changes. A good workflow uses the plan as a review step before applying infrastructure changes.

### 3. What is Terraform drift?

Drift occurs when infrastructure is changed outside Terraform and the real infrastructure no longer matches the configuration and state Terraform expects. Running a plan can detect many types of drift and show the changes Terraform would make to reconcile the infrastructure.

### 4. When would you use Ansible instead of Terraform?

Terraform is primarily designed to provision and manage infrastructure resources, while Ansible is commonly used for configuration management and application setup. For example, Terraform could create virtual machines and networks, while Ansible could install packages and configure services on those machines.

### 5. Why should infrastructure code be modular and reusable?

Modules reduce duplication and provide standardized ways to create infrastructure. Instead of every team implementing networking, Kubernetes clusters, or databases differently, reusable modules can enforce common patterns, security requirements, and operational standards.

---

# Containerization

### 1. What is the difference between a Docker image and a container?

An image is an immutable package containing the application, its dependencies, and the filesystem needed to run it. A container is a running instance of that image with its own isolated runtime environment.

### 2. What happens when Kubernetes creates a Pod?

The scheduler determines which node should run the Pod, and the node's kubelet instructs the container runtime to create the containers. Kubernetes then continuously monitors the Pod and attempts to maintain the desired state defined by the workload.

### 3. What is the difference between a Deployment, ReplicaSet, and Pod?

A Pod is the smallest deployable unit and runs one or more containers. A ReplicaSet maintains a desired number of Pod replicas. A Deployment manages ReplicaSets and provides higher-level capabilities such as rolling updates and rollbacks.

### 4. How does Kubernetes expose an application to other Pods or the internet?

A Service provides a stable network endpoint for a group of Pods. ClusterIP exposes it internally, NodePort exposes it through node ports, and LoadBalancer integrates with an external load balancer in supported environments. Ingress or Gateway APIs can provide HTTP/HTTPS routing at the application level.

### 5. What is the difference between Kubernetes requests and limits?

Requests tell Kubernetes how much CPU and memory a container needs for scheduling purposes. Limits define the maximum resources the container is allowed to consume. CPU can be throttled when its limit is reached, while exceeding a memory limit can result in the container being terminated.

---

# CI/CD Pipelines

### 1. What should a good CI/CD pipeline accomplish?

It should automatically validate changes, build artifacts, run tests and security checks, publish versioned artifacts, and deploy them through controlled environments. The goal is to make deployments repeatable, fast, traceable, and safe.

### 2. What is the difference between continuous integration and continuous deployment?

Continuous integration means frequently integrating changes into a shared codebase and automatically validating them. Continuous deployment goes further by automatically releasing validated changes to production without requiring a manual deployment step.

### 3. Why should build artifacts be immutable?

An immutable artifact is built once and promoted through environments without being modified. This guarantees that the artifact tested in staging is the same artifact deployed to production, making deployments reproducible and easier to troubleshoot.

### 4. How would you safely deploy a new application version?

I would use automated testing and validation first, then deploy progressively using strategies such as rolling, blue-green, or canary deployments. I would monitor the release and have an automated or well-defined rollback mechanism if the new version causes problems.

### 5. How should secrets be handled in CI/CD?

Secrets should be stored in a dedicated secrets manager or the CI/CD platform's protected secret storage rather than in source code or container images. They should be injected only when needed, have minimal permissions, be rotated regularly, and never be printed in pipeline logs.

---

# Observability

### 1. What is the difference between monitoring and observability?

Monitoring tells you whether known conditions are healthy by collecting predefined metrics and alerts. Observability is broader: it is the ability to understand why a system behaves a certain way using signals such as metrics, logs, traces, and other contextual information.

### 2. What are the main Prometheus concepts a DevOps engineer should understand?

The core concepts are metrics, labels, targets, scraping, exporters, PromQL, recording rules, alerting rules, and Alertmanager. Prometheus typically pulls metrics from monitored endpoints and stores them as time series identified by metric names and labels.

### 3. What is a Prometheus label and why can it be dangerous?

A label adds dimensions to a metric, such as service, instance, or HTTP status. Labels are powerful for querying, but high-cardinality labels can create a huge number of time series and cause excessive memory, storage, and query costs.

### 4. How would you investigate a sudden increase in HTTP 500 errors?

I would first determine when the increase started and which services, endpoints, instances, or versions are affected. Then I would correlate the metric with application logs, deployment changes, resource utilization, dependencies such as databases, and traces if available.

### 5. What makes a good alert?

A good alert represents a condition that requires human or automated action. It should have a clear threshold, sufficient duration to avoid noise, useful context, and an associated response procedure. An alert that fires frequently without requiring action is usually a bad alert.

---

# DevSecOps

### 1. Why should security scanning happen during CI/CD instead of only after deployment?

Finding vulnerabilities before deployment is cheaper and safer because insecure artifacts can be prevented from reaching production. Security should be integrated throughout the software delivery lifecycle rather than treated as a final manual inspection.

### 2. What should you scan in a container image?

I would scan the operating system packages, application dependencies, known vulnerabilities, secrets, configuration problems, and potentially malware depending on the security tooling. I would also generate an SBOM when appropriate to understand what components are actually present in the image.

### 3. Why is using the `latest` Docker tag a bad practice for production?

`latest` does not uniquely identify an immutable version. The same tag can point to different images over time, making deployments difficult to reproduce and audit. Production deployments should use immutable identifiers such as version tags or image digests.

### 4. What is the principle of least privilege?

It means giving an identity only the permissions required to perform its task and nothing more. If an application or CI/CD credential is compromised, least privilege limits the damage an attacker can cause.

### 5. Where should application secrets be stored?

They should be stored in a dedicated secrets-management system such as a cloud secrets manager, Vault, or an equivalent solution. Secrets should not be committed to Git, baked into container images, or exposed unnecessarily through logs or environment configuration.

---

# Virtualization

### 1. What is the fundamental difference between a VM and a container?

A VM virtualizes hardware and runs a complete guest operating system on top of a hypervisor. A container shares the host operating system kernel while isolating processes and their filesystem, networking, and resource usage. Containers are generally lighter and start faster.

### 2. What is a hypervisor?

A hypervisor is software that creates and manages virtual machines by providing virtualized hardware resources such as CPU, memory, storage, and networking. Type 1 hypervisors run directly on hardware, while Type 2 hypervisors run on top of a host operating system.

### 3. Why are containers usually more lightweight than VMs?

Containers do not need to boot a separate operating system kernel for every workload. They share the host kernel, so a container mainly contains the application and its userspace dependencies, resulting in lower overhead and faster startup.

### 4. What is the relationship between Docker and Kubernetes?

Docker is primarily a container technology and ecosystem used to build and package container images and historically to run containers. Kubernetes is a container orchestration platform that manages workloads across multiple machines. Kubernetes does not require Docker as its container runtime; it commonly uses runtimes such as containerd or CRI-O.

### 5. When would you choose a VM instead of a container?

I would choose a VM when I need a separate operating system kernel, stronger workload isolation, different operating systems, or compatibility with applications that are not well suited to containers. Containers are generally preferable when the application can operate within the shared-kernel model and benefits from fast, portable deployment.

---

# Tests

### 1. Testing
Testing.
