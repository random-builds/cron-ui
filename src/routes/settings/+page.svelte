<script lang="ts">
    const MAX_SIZE = 200;

    class Box {
        width = $state("");
        height = $state("");
        area = $derived(this.width * this.height);

        constructor(width: string, height: string) {
            this.width = width;
            this.height = height;
        }

        embiggen(amount: number) {
            this.width += amount;
            this.height += amount;
        }
    }

    const box = new Box("oo", "pp");
</script>


<form id="createJobForm">
    <input id="jobName" type="text" placeholder="Job Name" bind:value="{box.width}"/>
    <br/>
    <input id="jobDescription" type="text" placeholder="Job Description" bind:value="{box.height}"/>
</form>
{box.width}--
{box.height}
<!--<label>-->
<!--    <input type="range" bind:value={box.width} min={0} max={MAX_SIZE} />-->
<!--    {box.width}-->
<!--</label>-->

<!--<label>-->
<!--    <input type="range" bind:value={box.height} min={0} max={MAX_SIZE} />-->
<!--    {box.height}-->
<!--</label>-->

<!--<button onclick={() => box.embiggen(10)}>embiggen</button>-->

<!--<hr>-->

<!--<div-->
<!--        class="box"-->
<!--        style:width="{box.width}px"-->
<!--        style:height="{box.height}px"-->
<!--&gt;-->
<!--    {box.area}-->
<!--</div>-->

<!--<style>-->
<!--    label {-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--    }-->

<!--    hr {-->
<!--        margin: 1em 0;-->
<!--        border: none;-->
<!--        border-bottom: 1px solid #888;-->
<!--    }-->

<!--    .box {-->
<!--        background: radial-gradient(at 25% 25%, hsl(15 100 60), hsl(15 100 50)) ;-->
<!--        border-radius: 2px;-->
<!--        filter: drop-shadow(0 0 10px hsl(15 100 50 / 0.3));-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        justify-content: center;-->
<!--        overflow: hidden;-->
<!--    }-->
<!--</style>-->
