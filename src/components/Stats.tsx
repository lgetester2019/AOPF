'use client';

import CountUp from 'react-countup';
import { motion } from 'framer-motion';

type StatItem = {
    label: string;
    value: number | string;
};

const stats: StatItem[] = [
    { label: 'Лет на рынке', value: 14 },
    { label: 'Средний стаж экспертов', value: 17 },
    { label: 'Приборов в собственности', value: '180+' },
    { label: 'Объектов спецоценки', value: '12000+' },
];

export const Stats = () => {
    return (
        <div className="mx-auto max-w-[1350px] mt-2 pb-12 pt-6">
            <div className="grid grid-cols-2 bg-green-600/50 md:grid-cols-4 rounded-3xl overflow-hidden border-4 border-green-600">
                {stats.map((stat, idx) => {
                    let num: number;
                    let plus = false;

                    if (typeof stat.value === 'number') {
                        num = stat.value;
                    } else if (typeof stat.value === 'string' && stat.value.endsWith('+')) {
                        num = parseInt(stat.value);
                        plus = true;
                    } else {
                        num = 0;
                    }

                    return (
                        <div
                            key={idx}
                            className={`text-center py-8 px-4 ${
                                idx !== stats.length - 1 ? 'md:border-r-4 border-green-600' : ''
                            }`}
                        >
                            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl text-white flex justify-center items-center gap-1">
                                <CountUp start={0} end={num} duration={2} separator="" />
                                {plus && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{
                                            delay: 1.9,
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 20,
                                        }}
                                        className="inline-block"
                                    >
                                        +
                                    </motion.span>
                                )}
                            </h6>
                            <p className="text-sm font-medium tracking-widest text-white uppercase lg:text-base mt-2">
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
