document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { src: 'images/image1.jpg', alt: '展示图片1', description: '七点鲳' },
        { src: 'images/image2.jpg', alt: '展示图片2', description: '加工后' },
        { src: 'images/image3.jpg', alt: '展示图片3', description: '丰收' },
        { src: 'images/image4.jpg', alt: '展示图片4', description: '风景' }
        // 可以继续添加更多图片信息
    ];

    const gallery = document.getElementById('gallery');
    let lightbox = null; // 记录当前打开的灯箱
    let currentIndex = 0; // 记录当前图片索引

    function renderGallery() {
        gallery.innerHTML = ''; // 清空现有内容

        images.forEach((image, index) => {
            const imageElement = document.createElement('div');
            imageElement.classList.add('image');

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.addEventListener('click', () => showImage(index));

            const p = document.createElement('p');
            p.textContent = image.description;

            imageElement.appendChild(img);
            imageElement.appendChild(p);
            gallery.appendChild(imageElement);
        });
    }

    function showImage(index) {
        currentIndex = index; // 更新当前索引

        if (lightbox) {
            document.body.removeChild(lightbox); // 如果已经有灯箱打开，先关闭它
        }

        lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');

        const img = document.createElement('img');
        img.src = images[index].src;
        img.alt = images[index].alt;
        lightbox.appendChild(img);

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>'; // 使用 Font Awesome 图标
        closeBtn.classList.add('lightbox-close');
        closeBtn.addEventListener('click', () => {
            closeLightbox();
        });
        lightbox.appendChild(closeBtn);

        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>'; // 使用 Font Awesome 图标
        prevBtn.classList.add('lightbox-prev');
        prevBtn.addEventListener('click', () => {
            showImage((currentIndex - 1 + images.length) % images.length); // 使用模运算确保循环切换
        });
        lightbox.appendChild(prevBtn);

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>'; // 使用 Font Awesome 图标
        nextBtn.classList.add('lightbox-next');
        nextBtn.addEventListener('click', () => {
            showImage((currentIndex + 1) % images.length); // 使用模运算确保循环切换
        });
        lightbox.appendChild(nextBtn);

        document.body.appendChild(lightbox);
    }

    function closeLightbox() {
        if (lightbox) {
            document.body.removeChild(lightbox); // 移除灯箱元素
            lightbox = null; // 重置 lightbox 变量
        }
    }

    renderGallery();
});
