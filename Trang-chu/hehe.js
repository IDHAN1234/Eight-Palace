// Danh sách ID của các trang HERO (chỉ 3 trang này trượt ngang)
const heroPages = [
    'hero-one', 
    'hero-two', 
    'hero-three', 
];
const totalHeroPages = heroPages.length;
let currentHeroIndex = 0;
let heroSlider;

// Hàm trượt Hero (dùng cho nút mũi tên)
function scrollToPage(direction) {
    if (direction === 'next' && currentHeroIndex < totalHeroPages - 1) {
        currentHeroIndex++;
    } else if (direction === 'previous' && currentHeroIndex > 0) {
        currentHeroIndex--;
    } else {
        // Nếu đã ở cuối Hero slider, không làm gì (hoặc có thể cuộn xuống Giới thiệu chung)
        if (direction === 'next' && currentHeroIndex === totalHeroPages - 1) {
             document.getElementById('gioi-thieu-chung').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
             });
        }
        return;
    }
    
    // Áp dụng transform để trượt ngang container Hero
    const offset = currentHeroIndex * -100; // -100% cho mỗi slide
    heroSlider.style.transform = `translateX(${offset}vw)`;
    
    // Cập nhật trạng thái hiển thị của video nền
    updateBackground(heroPages[currentHeroIndex]);
}

// Hàm được gọi từ HTML
function goToNextPage() {
    scrollToPage('next');
}

function goToPreviousPage() {
    scrollToPage('previous');
}

// Cập nhật background (Video chỉ hiển thị trên Hero 1 VÀ Hero 2)
function updateBackground(activePageId) {
    const videoBg = document.querySelector('.video-bg');
    
    // Video nền sẽ hiển thị nếu trang hiện tại là Hero 1 HOẶC Hero 2
    if (activePageId === 'hero-one' || activePageId === 'hero-two') {
        videoBg.style.display = 'block';
    } else {
        videoBg.style.display = 'none';
    }
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    heroSlider = document.getElementById('hero-slider');
    
    // Thiết lập body cho cuộn dọc (bằng CSS)

    // Khởi tạo ở trang Hero đầu tiên
    updateBackground(heroPages[0]);
    
    // Thêm lắng nghe sự kiện cuộn chuột để điều hướng Hero slider
    window.addEventListener('wheel', (e) => {
        // Kiểm tra xem vị trí cuộn có đang ở trên khu vực Hero slider hay không
        const heroSliderRect = heroSlider.getBoundingClientRect();
        
        // Chỉ kích hoạt trượt ngang nếu Hero slider đang chiếm trọn viewport (tức là rect.top rất gần 0)
        // và chuột cuộn ngang (e.deltaX) hoặc cuộn dọc (e.deltaY)
        if (heroSliderRect.top > -100 && heroSliderRect.bottom < (window.innerHeight + 100)) {
            
            // Xử lý cuộn ngang (chủ yếu là trên trackpad hoặc magic mouse)
            if (Math.abs(e.deltaX) > 10) {
                 e.preventDefault(); // Ngăn cuộn dọc/ngang mặc định của trình duyệt
                 scrollToPage(e.deltaX > 0 ? 'next' : 'previous');
            } 
            // Xử lý cuộn dọc khi đang ở Hero slider
            else if (Math.abs(e.deltaY) > 20) {
                 // Nếu đang ở Hero cuối cùng và cuộn xuống, cho phép cuộn xuống phần nội dung dưới
                 if (currentHeroIndex === totalHeroPages - 1 && e.deltaY > 0) {
                     return; 
                 }
                 // Nếu đang ở Hero đầu tiên và cuộn lên, không làm gì
                 if (currentHeroIndex === 0 && e.deltaY < 0) {
                     return; 
                 }
                 
                 // Chặn cuộn dọc và chuyển Hero slide
                 e.preventDefault(); 
                 scrollToPage(e.deltaY > 0 ? 'next' : 'previous');
            }
        }
    });
});