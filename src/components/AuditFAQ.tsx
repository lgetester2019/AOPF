'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function AuditFAQ() {
    return (
        <section className="py-12 space-y-10 leading-relaxed text-gray-700">
            <h2 className="text-3xl font-bold text-center text-green-600">Вопросы и ответы по СОУТ</h2>
            <Accordion type="single" collapsible className="space-y-6 max-w-[1350px] mx-auto">

                <AccordionItem value="faq1">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            Срок действия декларации по СОУТ
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            Срок действия декларации по СОУТ не установлен. Через пять лет она продляется. В случае наступления несчастного случая декларация аннулируется. Работодатель должен следить за условиями труда сотрудников, на которых подавалась декларация, и при изменении материалов, оборудования, времени выполнения операций, реквизитов компании, названия или состава подразделений, а также должностей — проводить внеплановую специальную оценку условий труда. Также необходимо проводить производственный контроль для подтверждения соответствия задекларированного рабочего места гигиеническим нормативам (мониторинг условий труда).
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq2">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            Шаги организаций после проведения СОУТ
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            После проведения СОУТ ООО «АОПФ» выдает каждому заказчику памятку, где перечислены действия после завершения процедуры. За дополнительными разъяснениями можно обратиться к эксперту, менеджеру или начальнику лаборатории по тел. (812) 441-37-78.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq3">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            СОУТ и вредность рабочих мест аварийной бригады
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            Вредность на любом рабочем месте определяется экспертом: сначала идентифицируются потенциально вредные факторы (шум, вибрация, химия и т.д.), затем проводится их измерение. В случае превышения допустимых уровней присваивается определённый класс вредности. Для рабочих мест из специальных списков проводится дополнительная оценка травмоопасности.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq4">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            Зарегистрирована ли декларация СОУТ?
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            Проверить регистрацию можно в реестре деклараций, но это непросто. Рекомендуется сохранять сопроводительное письмо или копию декларации с отметкой при подаче в ГИТ. При отправке по почте — сохраняйте квитанцию и опись вложения. При электронной подаче должно прийти подтверждение на электронную почту. ООО «АОПФ» подаёт декларации в электронном виде и информирует заказчиков о внесении в реестр.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq5">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            Нужна ли спецоценка условий труда для офисных работников?
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            В соответствии с ФЗ-426, СОУТ проводится на всех рабочих местах, кроме надомников и сотрудников, работающих удалённо. В трудовом договоре удалённого работника должен быть указан адрес, порядок компенсации расходов (например, за электричество), а также способ передачи результатов работы. Если на рабочем месте не выявлены потенциально вредные факторы, оно подаётся на декларацию. Также часть рабочих мест может быть освобождена от СОУТ — уточните у нас, нужна ли она для вашего случая.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq6">
                    <AccordionTrigger>
                        <h3 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                            Какие документы нужны для СОУТ?
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-base">
                            Иногда организации просят справку об отсутствии материалов и оборудования на рабочем месте. Она может быть в свободной форме. Однако эксперты ООО «АОПФ» выезжают на объекты и сами фиксируют наличие или отсутствие оборудования. Проведение измерений удалённо, без выезда, — грубое нарушение, которое может привести к признанию СОУТ недействительной.
                        </p>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </section>
    )
}
