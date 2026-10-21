import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";
import printContent from "../../../../utils/printContent";
import FetchAllEmployeeForms from "../../../../controller/admin/AllFormsController";
import Spinner from "../../../../components/Spinner";
import exportToWord from "../../../../utils/exportToWord";

export default function SignedEmployeeHandbook() {
  const location = useLocation();
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [allForms, setAllForms] = useState([]);

  useEffect(() => {
    FetchAllEmployeeForms(
      setLoading,
      setErrors,
      setAllForms,
      apiBase,
      username,
    );
  }, []);

  const fullname = allForms?.application_form?.profile?.full_name;
  const data = allForms.employee_handbook;
  const title = "Employee Handbook";

  return (
    <>
      <title>Employee Handbook - 1staccess Home Care</title>
      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>{username}</h3>
                    <p className="mb-2">Manage all forms signed by user</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Profile </a>
                    <span>
                      <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <a href="#">Forms</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <Nav username={username} />
              {loading ? (
                <Spinner />
              ) : (
                <div className="col-md-9">
                  <div className="card">
                    <div id="printArea" className="card-body">
                      {/*  */}
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="/assets/images/main_logo.png"
                          width={200}
                          alt="Company Logo"
                        />
                        <h5 className="mt-10">
                          1st Access Home Care Incorporated
                        </h5>
                        <p>
                          6600 Fieldtan Trail, Moseley, VA, 23120 <br />
                          Agency Phone: (+1) 804-818-3216
                        </p>
                        <h3 className="mt-4 mb-3">Employee Handbook</h3>
                        <h5 className="mt-4 mb-3">
                          Virginia Home Care Organization
                        </h5>
                        <h5>Private Duty Nursing & Respite Services</h5>
                        <h6>Revised September 2026</h6>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              This handbook is intended for employees and, where
                              applicable, contract personnel of 1st Access Home
                              Care Inc. It is designed to reflect the agency's
                              current scope of home care services and Virginia
                              requirements applicable to a licensed home care
                              organization.
                            </p>
                            <p>
                              <strong>Table of Contents</strong>
                            </p>

                            <ol>
                              <li>1. Welcome and Handbook Disclaimer</li>
                              <li>2. Mission, Vision, Goals and Objectives</li>
                              <li>3. Scope of Services and Service Area</li>
                              <li>
                                4. Hours of Operation and On-Call Coverage
                              </li>
                              <li>5. Open Door and Communication Policy</li>
                              <li>
                                6. Equal Employment Opportunity and
                                Anti-Harassment
                              </li>
                              <li>
                                7. Employment Eligibility, Screening and
                                Personnel Qualifications
                              </li>
                              <li>
                                8. Confidentiality, HIPAA and Client Privacy
                              </li>
                              <li>
                                9. Scheduling, Attendance and Staffing Coverage
                              </li>
                              <li>10. Timekeeping, Pay and Overtime</li>
                              <li>
                                11. Personnel Records and Credential Maintenance
                              </li>
                              <li>
                                12. Employee Categories, Benefits and Leave
                              </li>
                              <li>
                                13. Professional Conduct and Ethical Standards
                              </li>
                              <li>14. Client-Home Conduct and Boundaries</li>
                              <li>
                                15. Dress, Identification and Personal Hygiene
                              </li>
                              <li>
                                16. Safety, Infection Prevention and Control
                              </li>
                              <li>17. Communicable Illness and Influenza</li>
                              <li>18. Drug-Free Workplace and Smoking</li>
                              <li>
                                19. Orientation, Competency and In-Service
                                Education
                              </li>
                              <li>
                                20. Complaints, Grievances and Client Concerns
                              </li>
                              <li>
                                21. Abuse, Neglect and Exploitation Reporting
                              </li>
                              <li>
                                22. Employee Injury and Incident Reporting
                              </li>
                              <li>
                                23. Emergency Preparedness and Inclement Weather
                              </li>
                              <li>
                                24. Information Technology and Electronic
                                Communications
                              </li>
                              <li>
                                25. Independent Contractors and Contracted
                                Services
                              </li>
                              <li>
                                26. Performance Management and Corrective Action
                              </li>
                              <li>27. Termination and Separation</li>
                              <li>28. Reporting Professional Violations</li>
                              <li>
                                29. Policy Review and Regulatory Compliance
                              </li>
                              <li>30. Employee Acknowledgment</li>
                            </ol>

                            <p className="mt-20">
                              <strong>
                                1. Welcome and Handbook Disclaimer
                              </strong>
                            </p>
                            <p>
                              1st Access Home Care Inc. welcomes you to our
                              team. Our employees are essential to the safe,
                              respectful and reliable delivery of home care
                              services to clients in their residences. This
                              handbook provides general personnel expectations
                              and agency procedures for employees working in
                              personal care, private duty nursing and respite
                              services.
                            </p>
                            <p>
                              The handbook is intended to be read together with
                              the employee's job description, applicable
                              clinical policies, client-specific plan of care or
                              service, agency policies and procedures, and
                              applicable federal and Virginia laws and
                              regulations.
                            </p>
                            <p>
                              This handbook does not create a contract of
                              employment or guarantee employment for any
                              particular period. The agency may revise policies
                              when operational needs, payer requirements,
                              professional standards, or changes in law or
                              regulation require revisions. Nothing in this
                              handbook is intended to reduce or eliminate any
                              right or protection provided by applicable law.
                            </p>
                            <p>
                              If a provision of this handbook conflicts with
                              applicable federal or Virginia law or regulation,
                              the applicable law or regulation will control.
                              Employees should direct questions to the
                              Administrator or designee.
                            </p>
                            <p>
                              Employment with the agency is at will to the
                              extent permitted by law. Nothing in this handbook
                              creates an express or implied promise of
                              employment for a specific term.
                            </p>

                            <p className="mt-20">
                              <strong>
                                2. Mission, Vision, Goals and Objectives
                              </strong>
                            </p>
                            <p>
                              Mission <br />
                              1st Access Home Care Inc. is committed to
                              providing safe, dependable and respectful home
                              care services that support clients in remaining in
                              their homes and communities. The agency seeks to
                              protect client dignity, promote independence,
                              support family caregivers, and provide services
                              within the scope of the agency's licensure,
                              employee qualifications, client authorization and
                              plan of care.
                            </p>
                            <p>
                              Vision <br />
                              1st Access Home Care Inc. seeks to be a trusted
                              Virginia home care provider recognized for
                              reliable staffing, competent caregivers,
                              respectful client relationships, effective
                              communication and compliance with applicable
                              regulatory requirements.
                            </p>
                            <p>Goals and Objectives</p>
                            <ol>
                              <li>
                                1. Provide services that are safe, appropriate
                                and consistent with the client's authorized plan
                                of care.
                              </li>

                              <li>
                                2. Employ and retain qualified, competent and
                                properly credentialed personnel.
                              </li>

                              <li>
                                3. Protect client rights, privacy, dignity and
                                property.
                              </li>

                              <li>
                                4. Maintain adequate staffing and communication
                                systems to reduce missed or delayed services.
                              </li>

                              <li>
                                5. Identify, report and respond promptly to
                                changes in client condition, incidents,
                                complaints, abuse, neglect and safety concerns.
                              </li>

                              <li>
                                5. Maintain effective infection prevention and
                                control practices.
                              </li>

                              <li>
                                6. Provide orientation, competency assessment
                                and required continuing education.
                              </li>

                              <li>
                                7. Maintain accurate personnel, service and
                                administrative records.
                              </li>

                              <li>
                                8. Continuously review agency operations for
                                quality improvement and regulatory compliance
                              </li>
                            </ol>

                            <p>
                              <strong>
                                3. Scope of Services and Service Area
                              </strong>
                            </p>
                            <p>
                              1st Access Home Care Inc. operates as a Virginia
                              home care organization and provides services
                              within the scope authorized by its license, payer
                              contracts, client authorizations and applicable
                              law. Current agency service focus:
                            </p>
                            <ol>
                              <li>
                                • Private Duty Nursing – nursing services
                                provided by appropriately qualified registered
                                nurses (RNs) and licensed practical nurses
                                (LPNs), as applicable, under an authorized plan
                                of care.
                              </li>

                              <li>
                                • Personal Care Services – assistance with
                                activities of daily living and instrumental
                                activities of daily living, as authorized by the
                                client's service plan and provided by
                                appropriately qualified personnel.
                              </li>

                              <li>
                                • Respite Services – temporary relief for an
                                unpaid family caregiver or other primary
                                caregiver, provided within the specific service
                                authorization and the employee's qualifications.
                              </li>
                            </ol>

                            <p>
                              The agency does not represent that it provides
                              every service listed in Virginia's home care
                              regulations. Current services include private duty
                              nursing, respite services and personal care
                              services, as authorized and within the agency's
                              license, payer requirements, client service plan
                              and employee qualifications. Employees may not
                              independently add, remove or change services,
                              treatments, tasks, frequencies or hours that are
                              not authorized.
                            </p>
                            <p>
                              Skilled nursing services must be provided in
                              accordance with the applicable medical plan of
                              care. Virginia regulations require nursing
                              services to be provided by appropriately qualified
                              RNs or LPNs, except for nursing tasks that may
                              lawfully be delegated by an RN. Supervision is
                              based on client needs, RN assessment and agency
                              policy and may not exceed the applicable
                              regulatory interval.
                            </p>
                            <p>
                              Service Area <br />
                              The agency will maintain and update its service
                              area in accordance with its Virginia license,
                              staffing availability and operational capacity.
                              Employees will be notified when service-area
                              information changes.
                            </p>

                            <p>
                              <strong>
                                4. Hours of Operation and On-Call Coverage
                              </strong>
                            </p>
                            <p>
                              The agency's administrative office hours and
                              after-hours/on-call coverage will be established
                              by management and communicated to employees.
                              Client services may occur outside normal
                              administrative office hours, including evenings,
                              nights, weekends and holidays, when authorized and
                              scheduled.
                            </p>
                            <p>
                              Employees providing direct care must follow the
                              assigned schedule and the agency's call-off and
                              on-call procedures. An employee must not abandon
                              an assigned client or leave a client without an
                              authorized transition or replacement when coverage
                              is required.
                            </p>
                            <p>
                              The agency will maintain staffing arrangements
                              appropriate to the services offered and the
                              assessed needs of clients, consistent with
                              Virginia home care requirements.
                            </p>

                            <p>
                              <strong>
                                5. Open Door and Communication Policy
                              </strong>
                            </p>
                            <p>
                              Employees are encouraged to communicate promptly
                              with their supervisor, Director of Nursing,
                              Administrator or designee regarding questions,
                              concerns, safety issues, client changes,
                              scheduling problems or workplace concerns.
                            </p>
                            <ol>
                              <li>
                                • Clinical concerns must be communicated through
                                the clinical chain of command.
                              </li>
                              <li>
                                • Urgent client safety concerns must be reported
                                immediately.
                              </li>
                              <li>
                                • Employees may raise compliance concerns
                                without retaliation.
                              </li>
                              <li>
                                • Communication concerning clients must protect
                                confidentiality and be limited to individuals
                                with a legitimate need to know.
                              </li>
                            </ol>

                            <p>
                              <strong>
                                6. Equal Employment Opportunity and
                                Anti-Harassment
                              </strong>
                            </p>
                            <p>
                              1st Access Home Care Inc. provides equal
                              employment opportunity and will comply with
                              applicable federal and Virginia employment laws.
                              Employment decisions will be made without unlawful
                              discrimination.
                            </p>
                            <p>
                              Harassment, sexual harassment, retaliation,
                              intimidation and discriminatory conduct are
                              prohibited. Employees should report concerns to a
                              supervisor, Administrator or other designated
                              management representative as soon as possible.
                            </p>
                            <p>
                              The agency will review complaints appropriately
                              and will take corrective action when warranted.
                            </p>

                            <p>
                              <strong>
                                7. Employment Eligibility, Screening and
                                Personnel Qualifications
                              </strong>
                            </p>
                            <p>
                              Before beginning employment or direct client
                              contact, employees must complete required hiring
                              documentation and demonstrate the qualifications
                              required for their position.
                            </p>
                            <ol>
                              <li>
                                • Employment eligibility documentation must be
                                completed as required by federal law.
                              </li>
                              <li>
                                • Employees must provide required licenses,
                                certifications, registrations and other
                                credentials.
                              </li>
                              <li>
                                • The agency will verify professional
                                credentials as required.
                              </li>
                              <li>
                                • The agency will obtain the required sworn
                                criminal-history disclosure and criminal record
                                check for compensated employees.
                              </li>
                              <li>
                                • An employee may not perform duties outside the
                                employee's education, training, license,
                                certification, competency or authorized
                                assignment.
                              </li>
                            </ol>

                            <p>
                              Virginia's current home care regulations require
                              personnel practices to comply with applicable law,
                              a staffing plan appropriate to the services
                              offered, verification of professional credentials,
                              and the required criminal record screening.{" "}
                            </p>

                            <p>
                              Virginia law also restricts compensated employment
                              of persons convicted of specified barrier crimes
                              and requires a sworn disclosure and criminal
                              history record process. A person generally may not
                              have direct patient contact until the required
                              original clearance or record has been received,
                              subject to the statutory exception for direct
                              supervision.
                            </p>

                            <p>
                              <strong>
                                8. Confidentiality, HIPAA and Client Privacy
                              </strong>
                            </p>
                            <p>
                              All employees must protect client information,
                              agency business information and personnel
                              information. Client information may be accessed,
                              discussed or disclosed only for legitimate work
                              purposes and as permitted or required by law.
                            </p>

                            <ol>
                              <li>
                                {" "}
                                • Do not discuss clients in public places or
                                with individuals who are not involved in the
                                client's care.
                              </li>
                              <li>
                                • Do not photograph, record or post client
                                information or images without authorized agency
                                and client/legal authorization.
                              </li>
                              <li>
                                • Do not use social media to identify or discuss
                                clients, their homes, conditions, schedules or
                                services.
                              </li>
                              <li>
                                • Secure paper and electronic records from
                                unauthorized access.
                              </li>
                              <li>
                                • Use the minimum necessary information for
                                legitimate business and care purposes when
                                applicable.
                              </li>
                            </ol>
                            <p>
                              Client records must receive confidential treatment
                              as required by law and Virginia home care
                              regulations. Client rights include privacy,
                              confidentiality, freedom from abuse and neglect,
                              participation in care planning, and the right to
                              refuse services.
                            </p>

                            <p>
                              <strong>
                                9. Scheduling, Attendance and Staffing Coverage
                              </strong>
                            </p>
                            <p>
                              Reliable attendance is a core job responsibility
                              in home care. Clients may depend on a scheduled
                              employee for essential care.
                            </p>
                            <ol>
                              <li>
                                • Employees must report to assigned visits on
                                time and remain for the scheduled service period
                                unless released by authorized management or an
                                emergency requires departure.
                              </li>
                              <li>
                                • Employees must not change a client schedule
                                without authorization.
                              </li>
                              <li>
                                • Employees must immediately notify the
                                supervisor or on-call person if they cannot
                                report for a scheduled shift.
                              </li>
                              <li>
                                • Employees may not arrange unauthorized
                                substitutes.
                              </li>
                              <li>
                                • Employees must report any circumstance that
                                could result in a missed, delayed or incomplete
                                service.
                              </li>
                            </ol>
                            <p>
                              The agency will use staffing procedures
                              appropriate to the type and volume of services
                              provided and the assessed needs of clients.
                            </p>
                            <p>
                              <strong>10. Timekeeping and Pay</strong>
                            </p>
                            <p>
                              Employees must accurately record all time worked.
                              Time records must reflect actual start and end
                              times and must not be falsified, altered
                              improperly, or completed for another employee.
                            </p>
                            <ol>
                              <li>
                                • Employees must follow the agency's approved
                                timekeeping method.
                              </li>
                              <li>• No employee may work off the clock.</li>
                              <li>
                                • Employees must report payroll or timekeeping
                                errors promptly.
                              </li>
                            </ol>

                            <p>
                              <strong>
                                11. Personnel Records and Credential Maintenance
                              </strong>
                            </p>
                            <p>
                              The agency maintains confidential personnel
                              records and will limit access to individuals with
                              a legitimate business or regulatory need.
                            </p>
                            <p>
                              Employees are responsible for keeping the agency
                              informed of changes affecting employment or
                              credentialing, including contact information,
                              emergency contacts, licenses, certifications and
                              required training.
                            </p>
                            <ol>
                              <li>
                                • Professional licenses and certifications must
                                remain current.
                              </li>
                              <li>
                                • Employees must immediately notify the agency
                                of any restriction, suspension, expiration or
                                disciplinary action affecting a required
                                credential.
                              </li>
                              <li>
                                • Required health, training and competency
                                documentation must be submitted as directed.
                              </li>
                            </ol>

                            <p>
                              <strong>
                                12. Employee Categories, Benefits and Leave
                              </strong>
                            </p>
                            <p>
                              Employees may be classified according to their job
                              duties and employment status. Classification does
                              not change the requirement to comply with
                              applicable wage, leave, benefit, tax and
                              employment laws.
                            </p>
                            <p>
                              Employees must request planned leave in advance
                              whenever possible. Because client services must
                              continue safely, leave requests are subject to
                              staffing and operational requirements, except
                              where applicable law provides otherwise.
                            </p>
                            <p>
                              The agency will administer legally protected leave
                              and accommodations in accordance with applicable
                              law.
                            </p>

                            <p>
                              <strong>
                                13. Professional Conduct and Ethical Standards
                              </strong>
                            </p>
                            <p>
                              Employees represent 1st Access Home Care Inc.
                              while providing services. Conduct must support
                              client safety, dignity and trust.
                            </p>

                            <ol>
                              <li>
                                {" "}
                                • Treat clients, families, coworkers and
                                community partners respectfully.
                              </li>
                              <li>
                                • Follow the client's authorized plan of
                                care/service and agency instructions.
                              </li>
                              <li>• Maintain professional boundaries.</li>
                              <li>
                                • Do not accept money, loans, personal financial
                                favors or inappropriate gifts from clients or
                                families.
                              </li>
                              <li>
                                • Do not privately contract with or solicit
                                agency clients for services outside the agency.
                              </li>
                              <li>
                                • Do not falsify records or documentation.
                              </li>
                              <li>
                                • Do not sleep while responsible for a client.
                              </li>
                              <li>
                                • Do not report to work impaired by alcohol,
                                illegal drugs or any substance that makes the
                                employee unsafe to perform duties.
                              </li>
                              <li>
                                • Do not engage in abuse, neglect, exploitation,
                                threats or violence.
                              </li>
                              <li>
                                • Do not bring unauthorized persons to a
                                client's home.
                              </li>
                            </ol>

                            <p>
                              <strong>
                                14. Client-Home Conduct and Boundaries
                              </strong>
                            </p>
                            <p>
                              The client's home is the workplace. Employees must
                              respect the client's home, privacy, routines and
                              property while maintaining appropriate
                              professional boundaries.
                            </p>

                            <ol>
                              <li>
                                • Enter the home only as authorized and identify
                                yourself appropriately.
                              </li>
                              <li>
                                • Perform only assigned services within the
                                employee's role and competency.
                              </li>
                              <li>
                                • Do not use client property, vehicles,
                                financial accounts or personal belongings
                                without authorization.
                              </li>
                              <li>
                                • Do not borrow money or personal property from
                                a client.
                              </li>
                              <li>
                                • Do not use client social media accounts or
                                post client information.
                              </li>
                              <li>
                                • Do not bring children, friends or other
                                unauthorized persons to a client's home.
                              </li>
                              <li>
                                • Report unsafe environmental conditions to the
                                supervisor.
                              </li>
                              <li>
                                • Report suspected abuse, neglect or
                                exploitation immediately as required by law and
                                agency policy.
                              </li>
                            </ol>

                            <p>
                              <strong>
                                15. Dress, Identification and Personal Hygiene
                              </strong>
                            </p>
                            <p>
                              Employees providing direct care must maintain
                              clean, safe and professional attire(scrubs)
                              appropriate to the assigned duties and
                              infection-control requirements.
                            </p>

                            <ol>
                              <li>
                                • Wear agency identification when required.
                              </li>
                              <li>
                                • Wear appropriate footwear for safe client
                                care.
                              </li>
                              <li>
                                • Maintain personal hygiene appropriate for
                                direct care.
                              </li>
                              <li>
                                • Keep hair and nails maintained in a manner
                                consistent with safe clinical practice.
                              </li>
                              <li>
                                • Wear required personal protective equipment
                                (PPE).
                              </li>
                            </ol>
                            <p>
                              The agency may establish additional dress
                              requirements for particular clients, procedures or
                              infection-control situations.
                            </p>

                            <p>
                              <strong>
                                16. Safety, Infection Prevention and Control
                              </strong>
                            </p>
                            <p>
                              Infection prevention is a core responsibility for
                              all employees. Employees must follow the agency's
                              infection prevention and control program, standard
                              precautions, transmission-based precautions when
                              indicated, hand hygiene requirements, PPE
                              requirements and exposure-control procedures.
                            </p>

                            <ol>
                              <li>
                                • Perform hand hygiene before and after client
                                contact and at other required times.
                              </li>
                              <li>
                                • Use PPE based on anticipated exposure and
                                agency procedures.
                              </li>
                              <li>
                                • Handle sharps safely and place them in
                                approved sharps containers.
                              </li>
                              <li>
                                • Report exposures, needlestick injuries,
                                blood/body-fluid exposures and communicable
                                illness promptly.
                              </li>
                              <li>
                                • Clean and disinfect equipment according to
                                agency procedures and manufacturer instructions.
                              </li>
                              <li>
                                • Do not work while experiencing an illness or
                                condition that makes direct client care unsafe;
                                notify the supervisor for instructions.
                              </li>
                            </ol>

                            <p>
                              Virginia's home care regulations require written
                              policies addressing communicable and reportable
                              diseases and other operational matters. The
                              agency's infection-control procedures are intended
                              to complement those requirements.
                            </p>

                            <p>
                              <strong>
                                17. Communicable Illness and Influenza
                              </strong>
                            </p>
                            <p>
                              Employees must report known or suspected
                              communicable illness that could affect safe client
                              care to the supervisor or designated clinical
                              manager before reporting to a client visit, when
                              feasible.
                            </p>
                            <p>
                              Influenza and other respiratory infections are
                              addressed through the agency's infection-control
                              approach. Employees should not knowingly expose
                              vulnerable clients to a communicable illness.
                              Management may modify assignments, require
                              appropriate precautions, or direct an employee to
                              remain away from client care when clinically or
                              operationally appropriate.
                            </p>
                            <p>
                              Employees must follow current agency instructions
                              regarding respiratory symptoms, exposure, testing,
                              vaccination documentation when applicable to a
                              particular assignment or payer requirement, PPE
                              and return to work.
                            </p>
                            <p>
                              The prior handbook specifically referenced
                              influenza in its infection-control provisions;
                              this revised handbook retains influenza within a
                              broader communicable-illness framework rather than
                              treating influenza as a standalone employment
                              requirement.
                            </p>

                            <p>
                              <strong>
                                18. Drug-Free Workplace and Smoking
                              </strong>
                            </p>
                            <p>
                              The agency prohibits employees from working while
                              impaired by alcohol or illegal drugs and prohibits
                              unlawful possession, use, distribution or sale of
                              controlled substances in connection with
                              employment.
                            </p>
                            <p>
                              The agency will maintain a drug-free workplace
                              policy consistent with Virginia law and applicable
                              employment requirements. Virginia law requires
                              home care organizations to establish policies for
                              maintaining a drug-free workplace and permits drug
                              testing in circumstances authorized by law.{" "}
                            </p>
                            <p>
                              Smoking and vaping are prohibited in client homes
                              and in any area where prohibited by law, client
                              requirements or agency policy. Employees must not
                              use tobacco or vaping products while providing
                              direct care.
                            </p>

                            <p>
                              <strong>
                                19. Orientation, Competency and In-Service
                                Education
                              </strong>
                            </p>
                            <p>
                              All new employees must complete agency orientation
                              before independently providing services.
                              Orientation will be appropriate to the employee's
                              position and may include:
                            </p>
                            <ol>
                              <li>
                                • Agency mission, policies and procedures.
                              </li>
                              <li>• Client rights and responsibilities. </li>
                              <li>• Confidentiality and HIPAA requirements.</li>
                              <li>• Infection prevention and control.</li>
                              <li>• Emergency procedures. </li>

                              <li>
                                • Abuse, neglect and exploitation reporting.
                              </li>
                              <li>• Incident reporting. </li>
                              <li>• Job-specific competencies. </li>
                              <li>• Client-specific training when required.</li>
                              <li>
                                • Safety, boundaries and professional conduct.
                              </li>
                            </ol>
                            <p>
                              Employees must maintain competency for assigned
                              duties. Competency may be assessed at hire, when
                              duties change, periodically, after an incident, or
                              when otherwise required.
                            </p>

                            <p>
                              For personal care services, Virginia regulations
                              require at least 12 hours of annual in-service
                              education for home attendants. If the agency
                              provides personal care services, applicable
                              training requirements will be incorporated into
                              the agency's training program.
                            </p>

                            <p>
                              <strong>
                                20. Complaints, Grievances and Client Concerns
                              </strong>
                            </p>
                            <p>
                              The agency will maintain a process for receiving,
                              documenting, investigating and responding to
                              employee and client complaints.
                            </p>

                            <ol>
                              <li>
                                • Employees may report concerns to a supervisor,
                                Administrator or designee.
                              </li>
                              <li>
                                • Client complaints must be forwarded promptly
                                through the agency's complaint process.
                              </li>
                              <li>
                                • Complaints concerning abuse, neglect,
                                exploitation, serious safety issues or
                                professional misconduct must be escalated
                                immediately.
                              </li>
                              <li>
                                • Retaliation for making a good-faith complaint
                                is prohibited.
                              </li>
                            </ol>

                            <p>
                              Virginia requires written client-rights policies
                              and requires those rights to be reviewed with
                              clients or their designees upon admission and
                              documented in the client's record.{" "}
                            </p>

                            <p>
                              <strong>
                                21. Abuse, Neglect and Exploitation Reporting
                              </strong>
                            </p>
                            <p>
                              Employees must report suspected abuse, neglect or
                              exploitation in accordance with Virginia law and
                              agency policy. Employees must not investigate
                              suspected abuse independently or confront an
                              alleged perpetrator when doing so could compromise
                              safety.
                            </p>

                            <ol>
                              <li>
                                • Protect the client from immediate danger when
                                possible and appropriate.
                              </li>
                              <li>
                                • Notify the supervisor/Administrator
                                immediately.
                              </li>
                              <li>
                                • Complete required agency incident
                                documentation.
                              </li>
                              <li>
                                • Make required reports to Adult Protective
                                Services, Child Protective Services, law
                                enforcement or other authorities as required by
                                law.
                              </li>
                              <li>
                                • Maintain client confidentiality while making
                                and documenting required reports.
                              </li>
                            </ol>

                            <p>
                              The agency's prior handbook already required
                              reporting of suspected child and adult abuse and
                              neglect and included Virginia reporting
                              information. The revised policy retains the
                              reporting obligation while directing employees to
                              use current agency contact information and current
                              statutory reporting procedures rather than relying
                              on outdated phone numbers.
                            </p>

                            <p>
                              <strong>
                                22. Employee Injury and Incident Reporting
                              </strong>
                            </p>
                            <p>
                              Employees must immediately report work-related
                              injuries, exposures, accidents, client incidents,
                              unsafe conditions and other reportable events to
                              the supervisor or designated management
                              representative.
                            </p>

                            <ol>
                              <li>
                                • Seek emergency medical attention when
                                necessary.
                              </li>
                              <li>
                                • Complete the required incident or injury
                                report promptly.
                              </li>
                              <li>
                                • Cooperate with follow-up, investigation and
                                workers' compensation procedures.
                              </li>
                              <li>
                                • Do not alter or conceal information about an
                                incident.
                              </li>
                            </ol>

                            <p>
                              The original handbook required immediate reporting
                              of work injuries and written incident
                              documentation. This revised policy keeps that
                              requirement while using a general timeframe so the
                              agency's current incident-reporting policy can
                              establish the specific deadline for each type of
                              event.
                            </p>

                            <p>
                              <strong>
                                23. Emergency Preparedness and Inclement Weather
                              </strong>
                            </p>
                            <p>
                              The agency will maintain emergency preparedness
                              procedures appropriate to home care operations.
                              Employees must follow instructions for severe
                              weather, power outages, disasters, infectious
                              disease events, evacuation, client emergencies and
                              other disruptions.
                            </p>

                            <ol>
                              <li>
                                • Do not place yourself or a client in
                                unreasonable danger.
                              </li>
                              <li>
                                • Notify the agency promptly when weather or an
                                emergency prevents safe travel.
                              </li>
                              <li>
                                • Follow client-specific emergency plans when
                                applicable.
                              </li>
                              <li>
                                • Maintain communication with the agency during
                                an emergency.
                              </li>
                            </ol>
                            <p>
                              The agency will balance continuity of essential
                              client services with employee and client safety.
                            </p>

                            <p>
                              <strong>
                                24. Information Technology and Electronic
                                Communications
                              </strong>
                            </p>
                            <p>
                              Agency electronic systems are for authorized
                              business purposes. Employees must protect
                              passwords, devices, records and client
                              information.
                            </p>

                            <ol>
                              <li>• Do not share passwords.</li>
                              <li>
                                • Do not access client information without a
                                legitimate work-related need.
                              </li>
                              <li>
                                • Do not transmit protected client information
                                through unauthorized personal accounts or
                                applications.
                              </li>
                              <li>
                                • Do not post confidential agency or client
                                information on social media.
                              </li>
                              <li>
                                • Report suspected loss, theft, unauthorized
                                access or disclosure promptly.
                              </li>
                            </ol>

                            <p>
                              The agency may monitor and manage agency-owned
                              systems consistent with law and agency policy.
                            </p>

                            <p>
                              <strong>
                                25. Independent Contractors and Contracted
                                Services
                              </strong>
                            </p>
                            <p>
                              The agency will use employees and contractors only
                              in accordance with applicable law and its
                              licensure requirements. Contractors providing
                              services on behalf of the agency must meet
                              applicable qualification, screening,
                              credentialing, contractual and policy
                              requirements.
                            </p>
                            <p>
                              Virginia requires a written agreement for services
                              provided by persons who are not employees of the
                              organization. The agreement must address the
                              services, participation in care planning,
                              coordination and evaluation, documentation,
                              scheduling, payment and required insurance, among
                              other matters.
                            </p>
                            <p>
                              <strong>
                                26. Performance Management and Corrective Action
                              </strong>
                            </p>
                            <p>
                              Employees will be evaluated based on job
                              responsibilities, competency, professional
                              conduct, reliability, documentation, client
                              service and compliance with agency policies.
                            </p>
                            <p>
                              Corrective action may include coaching,
                              counseling, written warning, suspension,
                              retraining, reassignment, removal from a case, or
                              termination, depending on the circumstances and
                              applicable law.
                            </p>
                            <p>
                              Serious violations may result in immediate removal
                              from client care and/or termination. Examples
                              include abuse or neglect, falsification of
                              records, theft, serious confidentiality
                              violations, working while impaired, violence,
                              serious safety violations, practicing outside
                              scope, or knowingly violating a client plan of
                              care.
                            </p>
                            <p>
                              <strong>27. Termination and Separation</strong>
                            </p>
                            <p>
                              Employees who resign should provide notice
                              consistent with agency expectations unless
                              circumstances or applicable law provide otherwise.
                              The agency may end employment consistent with
                              applicable law and the employee's employment
                              status.
                            </p>
                            <ol>
                              <li>
                                • Agency property must be returned upon
                                separation.
                              </li>
                              <li>
                                • Keys, badges, devices and client materials
                                must be returned as directed.
                              </li>
                              <li>
                                • Outstanding documentation must be completed.
                              </li>
                              <li>
                                • Confidentiality obligations continue after
                                employment ends.
                              </li>
                            </ol>

                            <p>
                              Where required, the agency will make appropriate
                              reports to licensing or regulatory authorities
                              concerning professional misconduct, impairment,
                              incompetence, negligence or other reportable
                              conduct.
                            </p>

                            <p>
                              <strong>
                                28. Reporting Professional Violations
                              </strong>
                            </p>
                            <p>
                              The agency will comply with applicable Virginia
                              reporting requirements concerning licensed or
                              certified health professionals. Employees and
                              managers must promptly report suspected
                              professional incompetence, negligence, unethical
                              or unprofessional conduct, impairment, abuse or
                              other conduct requiring regulatory reporting to
                              the appropriate agency representative.
                            </p>
                            <p>
                              Virginia law contains reporting requirements for
                              certain practitioner violations and related
                              conduct. The agency will use the current
                              applicable statute and licensing-board
                              requirements when making reports.
                            </p>

                            <p>
                              <strong>
                                29. Policy Review and Regulatory Compliance
                              </strong>
                            </p>
                            <p>
                              1st Access Home Care Inc. will maintain written
                              policies and procedures appropriate to its
                              services and will review them at least annually
                              and when changes in law, regulation, services,
                              operations or identified risks require revision.
                            </p>
                            <p>
                              Virginia's home care regulations require written
                              policies and procedures approved by the governing
                              body and annual review. Required areas include
                              administrative records, admission/discharge
                              criteria, informed consent, advance directives,
                              client rights, contract services, medication
                              management when applicable, quality improvement,
                              mandated reporting, communicable/reportable
                              diseases and other required operational topics.
                              citeturn0search14
                            </p>
                            <p>
                              The agency will maintain only those services,
                              procedures and requirements applicable to its
                              actual scope of operation. Policies will not state
                              that the agency provides a service that it does
                              not provide or that an employee must perform a
                              task outside the employee's qualifications or
                              authorized scope.
                            </p>

                            <p>
                              <strong>30. Employee Acknowledgment</strong>
                            </p>
                            <p>
                              I acknowledge that I have received the 1st Access
                              Home Care Inc. Employee Handbook. I understand
                              that I am responsible for reading and following
                              the policies and procedures applicable to my
                              position. I understand that the handbook is not a
                              contract of employment and that policies may be
                              revised as permitted by law.
                            </p>
                            <p>
                              I understand that I must protect client privacy
                              and confidentiality, follow the client's
                              authorized plan of care/service, maintain required
                              credentials and competency, report safety concerns
                              and suspected abuse or neglect, and comply with
                              applicable federal and Virginia laws and
                              regulations.
                            </p>
                            <p>
                              I understand that if I have questions about a
                              policy or my responsibilities, I should contact my
                              supervisor, Director of Nursing, Administrator or
                              designee.
                            </p>

                            <p className="mt-50">
                              Employee Name:{" "}
                              <strong>{fullname ?? "N/A"}</strong>
                            </p>
                            <p>Employee Signature:</p>
                            {data?.signature ? (
                              <img
                                className="signature"
                                src={`${apiBase}/storage/signature/${data.signature}`}
                                alt="Signature"
                                style={{ width: "100px" }}
                              />
                            ) : (
                              <p>
                                <em>No signature provided</em>
                              </p>
                            )}

                            <p className="mt-50">
                              Date:{" "}
                              <strong>{formatDate(data?.created_at)}</strong>
                            </p>
                            <p>
                              Administrator/Designee:
                              _______________________________________
                            </p>
                            <p>Date: ______________________</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mt-20">
                      <button
                        onClick={() => exportToWord({ fullname, title })}
                        className="btn btn-primary btn-lg"
                      >
                        Print
                      </button>
                      <Link
                        onClick={() => window.history.back()}
                        style={{ marginLeft: "10px" }}
                        className="btn btn-info btn-lg"
                      >
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
