<article @php(post_class())>
  <header>
    <h2 class="entry-title">
      <a href="{{ get_permalink() }}">
        {!! $title !!}
      </a>
    </h2>

    @include('partials.entry-meta')
  </header>

  <div class="border-t border-l border-[hsl(270,50%,32%)] rounded-tl-md p-4 entry-summary">

    @php(the_excerpt())
  </div>
</article>
