<script>
        // Search functionality
        document.querySelector('.search-icon').addEventListener('click', function() {
            const searchTerm = document.querySelector('.search-input').value;
            if (searchTerm.trim()) {
                console.log('Buscando por:', searchTerm);
                // Aqui você implementaria a lógica de busca
            }
        });

        // Enter key search
        document.querySelector('.search-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.querySelector('.search-icon').click();
            }
        });

        // Share buttons functionality
        document.querySelectorAll('.share-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.classList[1];
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.querySelector('.post-title').textContent);
                
                let shareUrl = '';
                
                switch(platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${title} ${url}`;
                        break;
                    case 'email':
                        shareUrl = `mailto:?subject=${title}&body=Confira este artigo: ${url}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });

