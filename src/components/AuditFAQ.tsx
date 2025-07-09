'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function AuditFAQ() {
    return (
        <section className="py-12 space-y-10 leading-relaxed text-gray-700">
            <h2 className="text-3xl font-bold text-center text-green-600">Вопросы и ответы по СУОТ</h2>
            <Accordion type="single" collapsible className="space-y-6 max-w-[1350px] mx-auto">

                <AccordionItem value="faq1">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            Обязательно ли разрабатывать СУОТ для малых предприятий с численностью менее 50 человек?
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            Да, согласно статье 212 ТК РФ, каждый работодатель обязан создать и обеспечить функционирование системы управления охраной труда (СУОТ), независимо от численности сотрудников. Однако для малых предприятий допускается применение типовой документации с адаптацией под конкретные условия.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq2">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            Какие последствия могут быть при отсутствии СУОТ на предприятии?
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            Отсутствие СУОТ является нарушением трудового законодательства и может повлечь административную ответственность. Проверяющие органы вправе наложить штрафы, приостановить деятельность или выдать предписания. При несчастных случаях на производстве это также усиливает ответственность работодателя.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq3">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            В каких случаях необходимо проводить аудит действующей СУОТ?
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            Аудит СУОТ рекомендуется проводить не реже одного раза в год, а также при несчастных случаях, внедрении новых процессов или изменениях в законодательстве. Это помогает своевременно выявлять и устранять риски.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq4">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            Что включает в себя услуга по внедрению СУОТ?
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            Услуга включает аудит текущего состояния охраны труда, разработку документов (положение, инструкции, регламенты), обучение персонала, назначение ответственных, управление рисками и помощь в прохождении проверок.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq5">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            Нужно ли разрабатывать СУОТ, если организация арендует офис в бизнес-центре?
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            Да, даже в офисе необходимо обеспечить охрану труда. СУОТ будет адаптирована под офисные риски, включая инструктажи, обучение, оценку рисков, СИЗ при необходимости и медосмотры.
                        </p>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </section>
    )
}
