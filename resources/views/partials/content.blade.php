<article @php(post_class())>
  <header>
    <h2 class="entry-title">
      <a href="{{ get_permalink() }}">
        {!! $title !!}
      </a>
    </h2>

    @include('partials.entry-meta')
  </header>

  <div class="relative p-6 rounded-tl-lg bg-white">
    <!-- Línea superior -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-tl-lg"></div>
    <!-- Línea izquierda -->
    <div class="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-red-500 to-orange-500 rounded-tl-lg"></div>

    @php(the_excerpt())

  </div>
</article>
