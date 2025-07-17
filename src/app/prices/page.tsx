"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "../../../src/components/Header";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

type ServiceItem = {
    service: string;
    price: string;
};

const souutData: ServiceItem[] = [
    { service: "Стоимость СОУТ офисного места", price: "от 500 рублей" },
    { service: "Стоимость СОУТ РМ на производстве с 1-3 показателей по химии", price: "1000 рублей" },
    { service: "Стоимость СОУТ РМ на производстве с 4-5 показателей по химии", price: "от 1100 рублей" },
    { service: "Минимальная стоимость договора", price: "4500 рублей" },
    { service: "Декларирование рабочих мест организации", price: "от 1500 рублей за организацию" },
    { service: "Оценка профессиональных рисков", price: "от 600 рублей за рабочее место" },
    { service: "Минимальная стоимость договора", price: "5000 рублей" },
    { service: "Аудит системы управления охраной труда(СУОТ)", price: "от 5000 рублей" },
    { service: "Разработка системы управления охраной труда(СУОТ)", price: "расчет стоимости по заявке" },
    { service: "Программа производственного контроля", price: "от 2000 рублей" },
    { service: "Программа производственного контроля качества воды", price: "по согласованию" },
    { service: "Разработка обеспеченности СИЗ в организации", price: "по согласованию" },
    { service: "Разработка технологических карт на погрузочно-разгрузочные работы", price: "от 17500 рублей за организацию" },
];

const chemistryData: ServiceItem[] = [
    { service: "Отбор проб воздуха рабочей зоны, замкнутых помещений (показатель)", price: "1000 рублей" },
    { service: "Отбор проб воды (питьевой, сточной, природной)", price: "1000 рублей" },
    { service: "Гравиметрический анализ воздуха", price: "500 рублей" },
    { service: "Фотоэлектроколориметрический, потенциометрический анализ воздуха", price: "800/1200 рублей" },
    { service: "Измерения экспресс-методом", price: "700/2000 рублей" },
    { service: "t0, запах, привкус, кратность разбавления (исследования воды)", price: "200 рублей" },
    { service: "Гравиметрический, фотометрический, титриметрический, потенциометрический методы", price: "395 рублей" },
    { service: "Гравиметрический, фотометрический, титриметрический методы (взвешенные вещества и др.)", price: "490 рублей" },
    { service: "Сульфаты, формальдегид, БПК5 и др.", price: "900 рублей" },
    { service: "Азот общий, фенолы, азот аммонийный", price: "1000 рублей" },
    { service: "Кобальт, марганец, медь, свинец и др.", price: "900 рублей" },
    { service: "Баканализ на 3 показателя (ОМЧ, ОКБ, e.Coli)", price: "1200 рублей" },
    { service: "Краткий анализ питьевой воды ХВС", price: "4400 рублей" },
    { service: "Краткий анализ питьевой воды ГВС", price: "5950 рублей" },
    { service: "Краткий анализ питьевой воды ХВС после промывки системы", price: "4950 рублей" },
    { service: "Краткий химический анализ питьевой воды колодцев, скважин", price: "3200 рублей" },
    { service: "Комплексный анализ питьевой воды колодцев, скважин", price: "4400 рублей" },
    { service: "Комплексный анализ сточной воды для декларации на 30 ингредиентов", price: "от 25600 рублей" },
];

// Добавляем тип параметра data
function getMinPrice(data: ServiceItem[]): number | null {
    const prices = data
        .map(({ price }: ServiceItem) => {
            const match = price.match(/(\d+)/);
            return match ? Number(match[1]) : null;
        })
        .filter((val): val is number => val !== null);
    return prices.length ? Math.min(...prices) : null;
}

export default function PricesPage() {
    const minSouutPrice = getMinPrice(souutData);
    const minChemistryPrice = getMinPrice(chemistryData);

    return (
        <>
            <Header />
            <div className="max-w-[1350px] mx-auto px-6 py-36">
                <h1 className="text-3xl font-bold mb-8">Цены на услуги</h1>

                <Accordion type="single" collapsible className="space-y-6 max-w-[1350px] mx-auto">
                    {/* СОУТ */}
                    <AccordionItem value="souut">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-semibold border-l-4 border-green-600 pl-4 text-green-600 cursor-pointer select-none">
                                Специальная оценка условий труда (СОУТ){minSouutPrice && ` от ${minSouutPrice} ₽`}
                            </h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Table className="w-full border border-gray-300 rounded-tl-lg rounded-tr-lg overflow-hidden border-b-0">
                                <TableHeader>
                                    <TableRow className="bg-gray-100 text-gray-800 font-semibold">
                                        <TableHead className="border border-gray-300 border-b-0 rounded-tl-lg px-4 py-2">
                                            Услуга
                                        </TableHead>
                                        <TableHead className="border border-gray-300 border-b-0 rounded-tr-lg px-4 py-2">
                                            Стоимость
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {souutData.map(({ service, price }, i) => (
                                        <TableRow key={i} className={i === 0 ? "bg-gray-50" : "bg-white"}>
                                            <TableCell className="border border-gray-300 border-t-0 px-4 py-2">{service}</TableCell>
                                            <TableCell className="border border-gray-300 border-t-0 px-4 py-2">{price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Химия */}
                    <AccordionItem value="chemistry">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-semibold border-l-4 border-green-600 pl-4 text-green-600 cursor-pointer select-none">
                                Химия{minChemistryPrice && ` от ${minChemistryPrice} ₽`}
                            </h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Table className="w-full border border-gray-300 rounded-bl-lg rounded-br-lg overflow-hidden">
                                <TableHeader>
                                    <TableRow className="bg-gray-100 text-gray-800 font-semibold">
                                        <TableHead className="border border-gray-300 border-b-0 rounded-tl-lg px-4 py-2">
                                            Услуга
                                        </TableHead>
                                        <TableHead className="border border-gray-300 border-b-0 rounded-tr-lg px-4 py-2">
                                            Стоимость
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {chemistryData.map(({ service, price }, i) => (
                                        <TableRow key={i} className={i === 0 ? "bg-gray-50" : "bg-white"}>
                                            <TableCell className="border border-gray-300 border-t-0 px-4 py-2">{service}</TableCell>
                                            <TableCell className="border border-gray-300 border-t-0 px-4 py-2">{price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                
            </div>
        </>
    );
}
