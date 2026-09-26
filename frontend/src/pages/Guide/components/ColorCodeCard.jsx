import React from 'react';
import { MorphemeBadge } from './MorphemeBadge';

export const ColorCodeCard = ({ className = '' }) => {
  return (
    <div className={`bg-white border border-[#e3e8f1] rounded-[16px] p-[18px] flex flex-col gap-[12px] ${className}`}>
      <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#5b6b82]">
        Renk kodu
      </span>
      <div className="flex items-center gap-[10px]">
        <MorphemeBadge text="epi-" type="prefix" />
        <span className="font-semibold text-[14px] text-[#475569]">Ön ek</span>
      </div>
      <div className="flex items-center gap-[10px]">
        <MorphemeBadge text="cardi/o" type="root" />
        <span className="font-semibold text-[14px] text-[#475569]">Kök</span>
      </div>
      <div className="flex items-center gap-[10px]">
        <MorphemeBadge text="-itis" type="suffix" />
        <span className="font-semibold text-[14px] text-[#475569]">Son ek</span>
      </div>
      <p className="m-0 mt-[4px] font-normal text-[13px] leading-[1.5] text-[#5b6b82]">
        Renkli parçalara tıklayınca o morfemin sayfası açılır.
      </p>
    </div>
  );
};
