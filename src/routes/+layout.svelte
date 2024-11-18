<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/login">Login</a>
	<a href="/jobs">Jobs</a>
	<a href="/settings">Settings</a>
</nav>

{@render children()}
