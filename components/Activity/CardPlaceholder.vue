<template>
  <article
    class="w-full lg:w-xs border-solid border-1 border-gray-700 z-0 scale-100 hover:scale-102 hover:shadow-lg hover:shadow-opacity-50 duration-200 cursor-pointer"
  >
    <header class="overflow-hidden relative h-30 animate-pulse">
      <h2></h2>
    </header>

    <div class="flex flex-col gap-2 animate-pulse">
      <div class="rounded-sm bg-slate-700 h-2 w-40"></div>
      <div class="rounded-sm bg-slate-700 h-2 w-35"></div>
      <div class="rounded-sm bg-slate-700 h-2 w-20"></div>
    </div>

    <footer class="flex flex-col gap-5">
      <div class="text-sm text-dark p-1 rounded-sm bg-slate-600 w-fit self-end">
        <span class="font-bold">0€</span>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-sm text-slate-500">Participant.es:</div>
        <ul class="inline-flex gap-2 p-0 m-0 animate-pulse">
          <li class="list-none">
            <span class="text-xs text-dark bg-slate-700 p-1 rounded-sm"
              >load</span
            >
          </li>
          <li class="list-none">
            <span class="text-xs text-dark bg-slate-700 p-1 rounded-sm"
              >load</span
            >
          </li>
          <li class="list-none">
            <span class="text-xs text-dark bg-slate-700 p-1 rounded-sm"
              >load</span
            >
          </li>
          <li class="list-none">
            <span class="text-xs text-dark bg-slate-700 p-1 rounded-sm"
              >load</span
            >
          </li>
        </ul>
      </div>

      <UIButton class="outline border-slate-700 text-slate">Load</UIButton>
    </footer>
  </article>
</template>
