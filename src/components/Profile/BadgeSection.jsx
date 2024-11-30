// import React from "react";

export default function BadgeSection() {
  const badges = [
    "https://cdn.prod.website-files.com/661b25aa8bda4a590a431922/666221640463c81adaf4afba_64a59700883a82beb1983664_Accredible_DigitalCredentialsBlog_02-DigitalBadge1.png",
    "https://png.pngtree.com/png-vector/20230116/ourmid/pngtree-3d-star-badge-clipart-png-image_6564314.png",
    "https://cdn.pixabay.com/photo/2013/07/12/16/01/badge-150755_640.png",
    "https://cdn.prod.website-files.com/661b25aa8bda4a590a431922/666221640463c81adaf4afba_64a59700883a82beb1983664_Accredible_DigitalCredentialsBlog_02-DigitalBadge1.png",
    "https://png.pngtree.com/png-vector/20230116/ourmid/pngtree-3d-star-badge-clipart-png-image_6564314.png",
    "https://cdn.pixabay.com/photo/2013/07/12/16/01/badge-150755_640.png",
    "https://cdn.prod.website-files.com/661b25aa8bda4a590a431922/666221640463c81adaf4afba_64a59700883a82beb1983664_Accredible_DigitalCredentialsBlog_02-DigitalBadge1.png",
    "https://png.pngtree.com/png-vector/20230116/ourmid/pngtree-3d-star-badge-clipart-png-image_6564314.png",
    "https://cdn.pixabay.com/photo/2013/07/12/16/01/badge-150755_640.png",
    "https://png.pngtree.com/png-vector/20230116/ourmid/pngtree-3d-star-badge-clipart-png-image_6564314.png",
  ];
  return (
    <div className="flex px-2 py-2 items-center h-full w-full gap-2">
      {badges.map((badge, index) => (
        <img
          src={badge}
          key={index}
          className="md:w-20 w-12 md:h-20 h-12 object-cover"
          alt=""
        />
      ))}
    </div>
  );
}
