<footer class="content-info bg-gray-900 text-white py-10">
  <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    @for ($i = 1; $i <= 4; $i++)
      @if (is_active_sidebar('sidebar-footer-' . $i))
        <div class="footer-col">
          @php(dynamic_sidebar('sidebar-footer-' . $i))
        </div>
      @endif
    @endfor
  </div>
</footer>
