	(function( $ )
	{
		/*
			jQuery SmartColumnScroller plugin
			-by Dusan Hlavaty
		*/
		$.fn.smartColumnScroller = function()
		{
			// there's no need to do $(this) because
			// "this" is already a jquery object

			
			// for each element, on which was this plugin called do (and then return entire element chain):
			return this.each(function()
			{
				// tomuto moc nerozumiem (zatial), ale raz pochopim ;-)
				var $this = $(this);

				// zapamatame si jeho povodnu 'top' poziciu
				$this.data('scs-top', $this.offset().top );
				
				// zapamatame si vysku rodicovskeho divu (v tejto vyske sa totiz budeme skrolovat)
				$this.data('scs-parent-height', $this.parent().height() );
				
				// zaregistrujeme sa pre 'odoberanie' scroll eventu
				$(window).scroll( function()
				{
					var exception;
					try
					{
						// var jQueryColumn = jQuery('div.col-c');
						
						// pripravime si premenne, aby sme ich neratali pri skrolovani zbytocne viackrat:
						
						// vypocitame si vysku stlpca (vyratavame ju vzdy nanovo, ak by sa medzicasom zmenila inym javascriptom)
						var jQueryColumnHeight = $this.height();
						
						// 'vytiahneme' si vysku rodica
						var jQueryColumnParentHeight = parseInt($this.data('scs-parent-height'));

						// ak je vyska stlca vacsia alebo rovna ako rodic, tak nemame co a kam skrolovat...
						if ( jQueryColumnHeight >= jQueryColumnParentHeight )
						{
							// ...a koncime
							return;
						}
						
						// pripravime si dalsie premenne, aby sme ich neratali pri skrolovani zbytocne viackrat:
						
						// 'vytiahneme' si povodnu 'top' poziciu stlpca
						var jQueryColumnOriginalTop = parseInt($this.data('scs-top'));
						// vyratame si vysku viewportu browsera (vyratavame ju vzdy nanovo, ak by uzivatel menil velkost okna)
						var browserWindowHeight = $(window).height();
						// zistime si kde uzivatel zaskroloval
						var browserScrollTop = $(document).scrollTop();
						
						// Ak uzivatel zaskroloval dole tak, ze uz stlpec nemoze skrolovat (lebo narazil na spodok), tak
						// prepneme chovanie stlca na 'static' a pridame na vrch stlpca 'margin-top'
						if (( jQueryColumnParentHeight + jQueryColumnOriginalTop - browserWindowHeight - browserScrollTop) <= 0)
						{
							// ak uz sme v stave 'static', tak nic nerobime
							if ($this.css('position') != 'static') // TODO: prerobit na .data('phase','3')
							{
								// nastavime na 'static'
								$this.css({'position':'static', 'margin-top':jQueryColumnParentHeight - jQueryColumnHeight});
							}
							
							// ukoncime beh
							return;
						}
						
						
						// Ak uzivatel zaskroloval dole tak, ze stlpec uz moze zacat skrolovat (lebo uz by sa pod nim objavilo biele miesto),
						// tak prepneme chovanie stlca na 'fixed' a vyratame spravne 'top' a 'left' poziciu
						if ((jQueryColumnHeight + jQueryColumnOriginalTop - browserWindowHeight - browserScrollTop) <= 0)
						{ 
							// ak uz sme v stave 'fixed', tak nic nerobime
							if ($this.css('position') != 'fixed') // TODO: prerobit na .data('phase','2')
							{
								// vyratame spravne 'top' poziciu stlpca
								var topPos =  browserWindowHeight - jQueryColumnHeight;
								// vyratame spravne 'left' poziciu stlpca
								var leftPos = $this.offset().left; // TODO: nacachovat do premennej ?!

								// nastavime na 'fixed'
								$this.css({'position':'fixed', 'margin-top':0, 'top': topPos, 'left':leftPos});
							}
						} else {
							// Ak uzivatel zaskroloval dole tak, ze stlpec este nema skrolovat (lebo ho uzivatel este nevidel cely az po spodok),
							// tak prepneme chovanie stlpca na 'static' a 'margin-top' vynulujeme

							// ak uz sme v stave 'static', tak nic nerobime
							if ($this.css('position') != 'static') // TODO: prerobit na .data('phase','1')
							{
								// nastavime na 'static'
								$this.css({'position':'static', 'margin-top':0});
							}
						}
						
					}
					catch (exception)
					{
						// ak doslo k akemukolvek problemu, tak 'resetneme'
						// stlpec do povodneho neskrolovacieho stavu
						$this.css({'position':'static', 'margin-top':0});
					}
				
				}); // END: scroll( function()
				
				
			}); // END: this.each(function()

			
		}; /* END: $.fn.smartColumnScroller = function()  */
	})( jQuery );

	// spustime to na pravy stlpec
	jQuery('div.col-c').smartColumnScroller();
	
	// spustime to na stredny stlpec
	jQuery('div.col-b2').smartColumnScroller();